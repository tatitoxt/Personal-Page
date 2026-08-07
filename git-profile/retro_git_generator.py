#!/usr/bin/env python3
import os
import sys
import random
import subprocess
from datetime import datetime, timedelta

def run_cmd(cmd, env=None):
    """Ejecuta un comando en la shell."""
    result = subprocess.run(cmd, shell=True, env=env, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error ejecutando: {cmd}\n{result.stderr}")
        return False
    return True

def backdate_repository(repo_path, start_date_str, end_date_str, num_commits=15):
    """
    Genera commits retroactivos repartidos entre start_date y end_date.
    """
    original_dir = os.getcwd()
    try:
        os.chdir(repo_path)
        print(f"📂 Procesando repositorio en: {os.getcwd()}")

        # Inicializar git si no existe
        if not os.path.exists(".git"):
            run_cmd("git init")
            run_cmd("git branch -M main")

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        if start_date >= end_date:
            print("❌ La fecha de inicio debe ser anterior a la fecha de fin.")
            return

        # Escanear archivos
        archivos_ignorar = {".git", "node_modules", "__pycache__", ".venv", "dist", "build", ".DS_Store"}
        archivos = []
        for root, dirs, files in os.walk("."):
            dirs[:] = [d for d in dirs if d not in archivos_ignorar]
            for file in files:
                if file not in archivos_ignorar:
                    rel_path = os.path.relpath(os.path.join(root, file), ".")
                    archivos.append(rel_path)

        if not archivos:
            # Crear un archivo de prueba si está vacío
            with open("PROJECT.md", "w") as f:
                f.write("# Proyecto\nCreado y mantenido por tatitoxt.\n")
            archivos.append("PROJECT.md")

        dias_totales = (end_date - start_date).days
        paso_dias = max(1, dias_totales // num_commits)
        fecha_actual = start_date

        env = os.environ.copy()
        archivos_por_commit = max(1, len(archivos) // num_commits)

        print(f"🗓️  Generando {num_commits} commits entre {start_date_str} y {end_date_str}...\n")

        for i in range(0, len(archivos), archivos_por_commit):
            grupo = archivos[i:i + archivos_por_commit]
            
            # Avanzar la fecha
            fecha_actual += timedelta(days=random.randint(1, paso_dias), hours=random.randint(1, 10))
            if fecha_actual > end_date:
                fecha_actual = end_date

            date_iso = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")

            for f in grupo:
                run_cmd(f'git add "{f}"')

            env["GIT_AUTHOR_DATE"] = date_iso
            env["GIT_COMMITTER_DATE"] = date_iso

            mensajes = [
                f"feat: agregar componentes principales (fase {i+1})",
                f"refactor: optimizar estructura de módulos",
                f"docs: actualizar documentación y tipos",
                f"fix: resolver inconsistencias menores",
                f"style: dar formato y limpiar código"
            ]
            msg = random.choice(mensajes)

            run_cmd(f'git commit -m "{msg}"', env=env)
            print(f"✅ Commit: [{date_iso}] -> {msg}")

        print("\n🎉 ¡Historial del proyecto retroactivo listo con éxito!")
        print("\nPara subirlo a tu GitHub (remoto):")
        print("  git remote add origin https://github.com/tatitoxt/NOMBRE_REPO.git")
        print("  git push -u origin main --force\n")

    finally:
        os.chdir(original_dir)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso:")
        print("  python3 retro_git_generator.py <RUTA_DEL_PROYECTO> <FECHA_INICIO_YYYY-MM-DD> <FECHA_FIN_YYYY-MM-DD>")
        print("\nEjemplo:")
        print("  python3 retro_git_generator.py ./mi-proyecto 2023-01-15 2023-06-20")
    else:
        repo_path = sys.argv[1]
        start_date = sys.argv[2]
        end_date = sys.argv[3]
        backdate_repository(repo_path, start_date, end_date)

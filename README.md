# Proyecto Unificado - Curriculum Vitae y Gestión de Historial Git

Este repositorio reúne el trabajo, código y resultados generados en las conversaciones anteriores: **'Creación de Currículum Vitae'** y **'Manipulación De Historial Git'**.

---

## 📁 Estructura del Proyecto

```
wonderful-planck/
├── cv/                                 # Resúmenes en formato Markdown ATS de alta conversión
│   ├── Fausto_Pastura_Resume_ATS.md    # Versión en Inglés
│   └── Fausto_Pastura_Resume_ATS_ES.md # Versión en Español
├── resume-app/                         # Aplicación Web Interactiva de CV / Portafolio Bilingüe
│   ├── index.html                      # Vista ejecutiva ATS + Portafolio bilingüe
│   ├── styles.css                      # Estilos con soporte para impresión / exportación PDF
│   └── app.js                          # Lógica de conmutación bilingüe y exportación
├── git-profile/                        # Scripts y configuraciones de perfil de GitHub
│   ├── GITHUB_PROFILE_README.md        # Perfil de GitHub con badges organizados por habilidades
│   ├── README.md                       # Perfil sincronizado
│   ├── retro_git_generator.py          # Script de automatización de historial Git
│   └── setup_profile.sh                # Script de configuración
└── context/                            # Contexto e historial de las conversaciones
    ├── conversaciones_previas.md
    └── cv/implementation_plan_cv.md
```

---

## 💻 Uso Rápido

### Visualizar la Web App de CV
Puedes previsualizar la aplicación web ejecutando en tu terminal:
```bash
npx serve resume-app
# O usando Python:
python3 -m http.server 8000 --directory resume-app
```
Luego abre `http://localhost:8000` en tu navegador para ver la vista ejecutiva ATS, cambiar entre español e inglés o exportar a PDF con un solo clic.

---

## ⚙️ Reglas y Contexto para Antigravity
Las reglas de contexto están configuradas en [`.agents/rules/conversaciones.md`](file:///.agents/rules/conversaciones.md). Puedes referenciar las conversaciones originales en el chat usando:
- `@35b1bbe9-0992-47bf-adce-53bf929b86b8` (Currículum Vitae)
- `@eace9a39-00a7-47f2-b659-e733d6f70773` (Historial Git)

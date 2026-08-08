import os
import subprocess
import datetime
import random

REPO_DIR = '/Users/fausto/Documents/antigravity/wonderful-planck/troubleshoot-lwc'
AUTHOR_NAME = "Fausto"
AUTHOR_EMAIL = "tatitofau@gmail.com"

# 2024 Range: Oct 1, 2024 to Dec 31, 2024
START_2024 = datetime.datetime(2024, 10, 1, 10, 0, 0)
END_2024 = datetime.datetime(2024, 12, 31, 19, 0, 0)
SPAN_2024 = int((END_2024 - START_2024).total_seconds())

# 2025 Range: Oct 1, 2025 to Dec 31, 2025
START_2025 = datetime.datetime(2025, 10, 1, 10, 0, 0)
END_2025 = datetime.datetime(2025, 12, 31, 19, 0, 0)
SPAN_2025 = int((END_2025 - START_2025).total_seconds())

def run_cmd(cmd, cwd=REPO_DIR, env=None):
    res = subprocess.run(cmd, shell=True, cwd=cwd, env=env, capture_output=True, text=True)
    return res.stdout.strip()

def main():
    print("Re-dating commits across BOTH 2024 and 2025...")
    commits = run_cmd("git rev-list --reverse HEAD").split('\n')
    commits = [c for c in commits if c]
    total = len(commits)
    
    half = total // 2
    
    step_2024 = SPAN_2024 / max(1, half)
    step_2025 = SPAN_2025 / max(1, total - half)
    
    new_parent = None
    
    for i, old_hash in enumerate(commits):
        if i < half:
            sec = i * step_2024 + random.randint(-1800, 1800)
            dt = START_2024 + datetime.timedelta(seconds=max(0, int(sec)))
        else:
            idx = i - half
            sec = idx * step_2025 + random.randint(-1800, 1800)
            dt = START_2025 + datetime.timedelta(seconds=max(0, int(sec)))
            
        date_str = dt.strftime("%Y-%m-%d %H:%M:%S -0300")
        
        tree = run_cmd(f"git rev-parse {old_hash}^{{tree}}")
        msg = run_cmd(f"git log -1 --format=%B {old_hash}")
        
        env = os.environ.copy()
        env['GIT_AUTHOR_NAME'] = AUTHOR_NAME
        env['GIT_AUTHOR_EMAIL'] = AUTHOR_EMAIL
        env['GIT_COMMITTER_NAME'] = AUTHOR_NAME
        env['GIT_COMMITTER_EMAIL'] = AUTHOR_EMAIL
        env['GIT_AUTHOR_DATE'] = date_str
        env['GIT_COMMITTER_DATE'] = date_str
        
        if new_parent is None:
            cmd = f'git commit-tree {tree} -m "{msg}"'
        else:
            cmd = f'git commit-tree {tree} -p {new_parent} -m "{msg}"'
            
        new_hash = run_cmd(cmd, env=env)
        new_parent = new_hash
        
    run_cmd(f"git reset --hard {new_parent}")
    print(f"Successfully distributed {total} commits across BOTH 2024 and 2025!")

if __name__ == '__main__':
    main()

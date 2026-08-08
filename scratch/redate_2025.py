import os
import subprocess
import datetime
import random

REPO_DIR = '/Users/fausto/Documents/antigravity/wonderful-planck/troubleshoot-lwc'
AUTHOR_NAME = "Fausto"
AUTHOR_EMAIL = "tatitofau@gmail.com"

# 3 Months span in 2025: Oct 1, 2025 to Dec 31, 2025
START_DATE = datetime.datetime(2025, 10, 1, 10, 0, 0)
END_DATE = datetime.datetime(2025, 12, 31, 19, 0, 0)
TOTAL_SECONDS = int((END_DATE - START_DATE).total_seconds())

def run_cmd(cmd, cwd=REPO_DIR, env=None):
    res = subprocess.run(cmd, shell=True, cwd=cwd, env=env, capture_output=True, text=True)
    return res.stdout.strip()

def main():
    print("Re-dating troubleshoot-lwc commits to 2025 3-month window (Oct 1 - Dec 31, 2025)...")
    
    # Get all commit hashes in chronological order (oldest to newest)
    commits = run_cmd("git rev-list --reverse HEAD").split('\n')
    commits = [c for c in commits if c]
    total_commits = len(commits)
    print(f"Total commits to re-date: {total_commits}")

    step = TOTAL_SECONDS / max(1, total_commits)
    
    # Rebase filter-branch or git commit tree amendment
    # We can use git commit-tree loop to rebuild the branch cleanly
    first_commit = commits[0]
    
    # Get tree of each commit and parent
    # Rebuild history with new timestamps and author tatitofau@gmail.com
    new_parent = None
    
    for i, old_hash in enumerate(commits):
        current_sec = i * step + random.randint(-1800, 1800)
        dt = START_DATE + datetime.timedelta(seconds=max(0, int(current_sec)))
        date_str = dt.strftime("%Y-%m-%d %H:%M:%S -0300")
        
        # Get commit message and tree
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
        
    # Reset main branch to new_parent
    run_cmd(f"git reset --hard {new_parent}")
    print(f"Successfully re-dated {total_commits} commits across Oct 1, 2025 - Dec 31, 2025!")
    print(f"New HEAD: {new_parent}")

if __name__ == '__main__':
    main()

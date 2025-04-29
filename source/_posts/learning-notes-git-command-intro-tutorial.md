---
title: Git 指令學習筆記 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags: 
    - Github
    - Git
    - 版本控制

---

# 前言

Git 是現代軟體開發中最常使用的分散式版本控制系統，它幫助開發者管理源代碼的版本和協作。這篇教學將從基礎開始，介紹 Git 的常用命令並提供實際範例，幫助你熟悉如何使用 Git 來進行版本控制與協作。

## 1. 初始化 Git 倉庫 (`git init`)

在專案資料夾中使用 `git init` 可以初始化一個新的 Git 倉庫，這樣就可以開始使用 Git 來管理專案中的檔案版本。

```bash
git init
```

執行後會在專案資料夾內建立一個 `.git` 的隱藏資料夾，這表示這個資料夾已經被 Git 所管理。

## 2. 查看當前狀態 (`git status`)

在進行版本控制時，使用 `git status` 可以查看專案的當前狀態。這個命令會顯示哪些檔案已經被修改、哪些檔案尚未加入版本控制。

```bash
git status
```

這會列出所有變更過的檔案（包括已修改、尚未追蹤的檔案等）以及當前分支的狀態。

## 3. 新增檔案到暫存區 (`git add`)

修改檔案後，必須先使用 `git add` 把檔案新增到暫存區，才可以進行提交。使用 `git add` 可以指定單一檔案或多個檔案，或者一次將所有檔案加入暫存區。

```bash
git add filename.txt
```

或將所有變更加入暫存區：

```bash
git add .
```

## 4. 提交變更 (`git commit`)

將檔案從暫存區提交到本地版本庫使用 `git commit`。每次提交時，需要提供一個簡短的描述，解釋這次提交的內容。

```bash
git commit -m "新增使用者登錄功能"
```

## 5. 設定 Git 使用者資訊 (`git config`)

在進行提交之前，必須設定 Git 的使用者名稱和電子郵件。這些資料會與每次提交關聯。

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

這會把你的名稱和郵箱寫入全域設定，未來每次提交都會使用這些設定。

## 6. 查看提交歷史 (`git log`)

使用 `git log` 可以查看專案的提交歷史。這會顯示每次提交的詳細信息，包括提交哈希值、作者、日期和提交訊息。

```bash
git log
```

如果希望更簡潔的輸出，可以使用 `--oneline` 參數：

```bash
git log --oneline
```

## 7. 恢復檔案 (`git restore`)

如果你修改了一些檔案並且還沒有提交，可以使用 `git restore` 恢復檔案到上次提交的狀態，撤銷變更。

```bash
git restore filename.txt
```

如果想撤銷暫存區的變更，可以使用：

```bash
git restore --staged filename.txt
```

## 8. 追蹤檔案變動紀錄 (`git blame`)

如果你想查看某個檔案每一行是誰在什麼時候修改的，可以使用 `git blame`。

```bash
git blame filename.txt
```

這會顯示每一行的修改者與修改時間，有助於了解程式碼的歷史。

## 9. 建立分支 (`git branch`)

在 Git 中，分支讓你能夠並行地進行多個工作。你可以使用 `git branch` 查看目前所有的分支。

```bash
git branch
```

要創建新的分支：

```bash
git branch feature-login
```

## 10. 切換分支 (`git switch`)

要切換到不同的分支，可以使用 `git switch`。例如，切換到 `feature-login` 分支：

```bash
git switch feature-login
```

如果你要創建並切換到一個新的分支，可以加上 `-c` 選項：

```bash
git switch -c feature-register
```

## 11. 切換提交紀錄或分支 (`git checkout`)

雖然 `git switch` 是較新的命令，但仍然可以使用 `git checkout` 切換分支或還原檔案。要切換到某個分支：

```bash
git checkout feature-login
```

若要還原某個檔案到指定的提交：

```bash
git checkout <commit_hash> filename.txt
```

## 12. 合併分支 (`git merge`)

將不同分支的更改合併回主分支可以使用 `git merge`。首先切換到目標分支（例如 `main`），然後執行合併操作：

```bash
git switch main
git merge feature-login
```

如果有衝突，Git 會提示你解決衝突。

## 13. 重新整理提交歷史 (`git rebase`)

`git rebase` 用來重新整理提交歷史，將一個分支的更改重新應用到另一個分支上，使歷史更為線性。

```bash
git switch feature-login
git rebase main
```

這會將 `feature-login` 分支的變更，重新應用到 `main` 分支的最新提交上。

## 14. 重置提交 (`git reset`)

如果你想取消最近一次的提交，可以使用 `git reset`。使用 `--soft` 保留檔案變更，`--hard` 則會刪除變更：

```bash
git reset --soft HEAD^
```

這會將上一個提交撤回，但保留檔案變更；若使用 `--hard`，則會完全撤回提交及變更。

## 15. 查看操作紀錄 (`git reflog`)

`git reflog` 可以幫助你查看 HEAD 的操作紀錄，即便你進行了 `reset` 或 `checkout` 等操作。

```bash
git reflog
```

這個命令列出所有曾經指向 HEAD 的 commit 參考，並且可以用來恢復丟失的提交。

## 16. 暫存變更 (`git stash`)

如果你正在進行某些變更，但又需要切換到其他分支處理緊急問題，可以使用 `git stash` 暫時儲存未提交的變更：

```bash
git stash
```

這會暫時保存變更，並恢復工作目錄到最後一次提交的狀態。待你完成緊急工作後，可以使用 `git stash pop` 恢復變更。

## 17. 選擇性地應用提交 (`git cherry-pick`)

`git cherry-pick` 讓你可以選擇性地將某個提交應用到當前分支。例如，將 `feature-login` 分支的某個提交應用到 `main` 分支：

```bash
git cherry-pick <commit_hash>
```

這對於選擇性地將某些特定變更移動到其他分支非常有用。

## 18. 子模組 (`git submodule`)

當專案中有其他專案作為依賴時，可以使用 Git 子模組來管理。首先，將子模組加入專案：

```bash
git submodule add <repository_url> path/to/submodule
```

這會在專案中加入一個指向其他 Git 倉庫的子模組。在克隆專案時，記得加上 `--recurse-submodules` 來獲取子模組的內容。

---

# 總結

以上介紹了 Git 中一些常用的命令，這些命令幾乎涵蓋了日常開發中的大部分需求。熟練掌握 Git 讓你在開發過程中更加高效，無論是單人開發還是團隊協作，都能大大提高工作流的順暢性。如果你還有進一步的需求或疑問，隨時可以深入學習 Git 的進階技巧。
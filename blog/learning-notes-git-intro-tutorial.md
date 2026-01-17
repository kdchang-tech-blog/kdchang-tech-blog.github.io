---
title: Git 入門教學筆記：從零開始學版本控制 | 學習筆記
date: 2023-12-21 11:33:41
authors: kdchang
tags: 
    - Github
    - Git
    - 版本控制

---

## 為什麼要學 Git？

在軟體開發中，版本控制是一個不可或缺的工具。Git 是目前最流行的版本控制系統，它能幫助你：

- 記錄每次修改的歷史紀錄
- 回復到任一個過去的狀態
- 多人協作開發不衝突
- 管理分支進行實驗性開發

無論是獨立開發者、團隊協作，還是參與開源專案，Git 都是你的好夥伴。

---

## 一、安裝 Git

### macOS
```bash
brew install git
```

### Ubuntu / Debian
```bash
sudo apt update
sudo apt install git
```

### Windows
請至官網下載安裝：[https://git-scm.com](https://git-scm.com)

---

## 二、基本設定

第一次使用 Git 前，請先設定你的名稱與 Email（這會記錄在每次提交的資訊中）：

```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

你也可以檢查目前的設定：

```bash
git config --list
```

---

## 三、建立本地倉庫（repository）

### 建立一個新資料夾並初始化 Git

```bash
mkdir my-project
cd my-project
git init
```

此時 `.git/` 目錄會被建立，代表你已經在這個資料夾啟用了版本控制。

---

## 四、版本控制的基本流程

Git 的工作流程大致分為三個區域：

1. **工作區（Working Directory）**：你實際修改的檔案
2. **暫存區（Staging Area）**：準備提交的檔案
3. **版本庫（Repository）**：正式提交的版本歷史

### 1. 查看狀態

```bash
git status
```

### 2. 將檔案加入暫存區

```bash
git add 檔名
# 或加入全部變動檔案
git add .
```

### 3. 提交版本（commit）

```bash
git commit -m "加入了首頁 HTML 結構"
```

---

## 五、版本紀錄與回溯

### 查看提交紀錄

```bash
git log
```

如果想要簡潔查看

```bash
git log --oneline
```

### 回到先前的狀態（例如最近一次提交）

```bash
git checkout HEAD^
# 回到上上一個版本
git checkout HEAD~2
```

但請注意這樣會進入「detached HEAD」狀態，只是暫時查看，不適合繼續開發。

---

## 六、分支操作（branch）

分支是 Git 強大的一環，可以讓你同時開發多個功能而互不干擾。

### 建立新分支

```bash
git branch feature-login
```

### 切換分支

```bash
git checkout feature-login
```

或合併成一行：

```bash
git checkout -b feature-login
```

### 合併分支

切回主分支（通常是 `main` 或 `master`）：

```bash
git checkout main
git merge feature-login
```

---

## 七、遠端倉庫（Remote Repository）

若你使用 GitHub、GitLab 等服務，可以將本地專案推送到遠端：

### 新增遠端倉庫

```bash
git remote add origin https://github.com/yourname/yourproject.git
```

### 推送本地分支

```bash
git push -u origin main
```

### 拉取遠端最新變更

```bash
git pull origin main
```

---

## 八、.gitignore 檔案

`.gitignore` 用來指定不想被 Git 管理的檔案，例如：

```txt
node_modules/
.env
*.log
.DS_Store
```

建立一個 `.gitignore` 檔案，放進你專案根目錄，就能避免把不該版本控制的東西送到遠端倉庫。

---

## 九、常見狀況與解法

### 修改後不小心沒 add 就 commit 了？

可用下列方式補上：

```bash
git add 新增的檔案
git commit --amend
```

### 想撤銷修改？

還沒 add 的：

```bash
git checkout -- 檔案名
```

已經 add 了但還沒 commit：

```bash
git reset HEAD 檔案名
```

---

## 十、總結：從習慣開始，讓版本控制變簡單

熟悉 Git 的過程一開始可能會覺得繁瑣，但當你習慣了之後，它會成為你每天工作中不可或缺的工具。建議你在小專案中練習基本指令，隨手記錄每次的變更，透過良好的 commit message，讓未來的你感謝現在有好好整理的你。

如果你希望與他人協作開發，Git 更能大幅簡化流程、避免衝突。下一步，你可以學習 Pull Request（PR）、Git Flow、Rebase 等進階技巧，逐步精進你的版本控制能力。

# 參考文件
1. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
2. [約定式提交](https://www.conventionalcommits.org/zh-hant/v1.0.0/)
3. [[Git] Conventional Commits 規範性提交](https://hackmd.io/@ohQEG7SsQoeXVwVP2-v06A/rkhtpmyXa)
4. [git reflog - 還原大招](https://w3c.hexschool.com/git/10bf7677)
5. [為你自己學 Git](https://gitbook.tw/)
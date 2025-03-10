---
title: Git Flow 介紹與 GitHub Flow 介紹入門教學筆記 | 學習筆記
date: 2024-12-05 02:23:41
author: kdchang
tags: 
    - Git Flow
    - Github Flow
    - Github
    - Git

---

# 前言

在軟體開發中，版本控制是協作開發中至關重要的工具。Git 作為當前最受歡迎的版本控制系統，其強大的分支管理和版本控制功能，使得開發團隊能夠高效地進行協作。兩種常見的 Git 工作流是 Git Flow 和 GitHub Flow，這些工作流提供了清晰的分支管理策略，讓團隊可以更加有序地開發和部署代碼。本文將介紹 Git Flow 和 GitHub Flow 的基本概念、使用方法，以及它們之間的區別。

# 一、Git Flow 介紹

Git Flow 是一個基於 Git 的分支管理模型，主要由 Vincent Driessen 提出，旨在幫助開發團隊實現規範化的分支管理，並對不同開發階段的代碼進行有效的管理。Git Flow 工作流適合需要頻繁發布新版本的項目，並且開發流程中包含多個階段，如開發、測試、發佈等。其工作流程通常包含以下幾個核心分支：

#### 1.1 主要分支

1. **master 分支**：
   `master` 分支是 Git Flow 中的核心分支，所有穩定的代碼都應該存在於此。每當一個新版本的代碼準備好發佈時，都會從 `develop` 分支合併到 `master`，並標記相應的版本號。這個分支通常只包含穩定的代碼，並且代表了隨時可以部署的代碼。

2. **develop 分支**：
   `develop` 分支用於開發中的代碼。所有的功能開發都應該從這個分支進行，並且當開發完成後，合併回 `develop`。這個分支是整個項目的集成區，開發人員應該從 `develop` 分支開始開發新功能。

#### 1.2 輔助分支

1. **feature 分支**：
   `feature` 分支用於開發新的功能。每個新功能都應該從 `develop` 分支創建一個新的 `feature` 分支，並且在功能開發完成後，將該分支合併回 `develop` 分支。`feature` 分支的命名通常為 `feature/<功能名稱>`。

2. **release 分支**：
   當 `develop` 分支上的代碼準備好進入測試階段時，會創建一個 `release` 分支。這個分支用來準備最終的發佈版本。在 `release` 分支上進行的主要工作包括 bug 修復、文檔編寫等，確保最終版本的穩定性。當測試完成並且代碼準備發佈時，`release` 分支會被合併到 `master` 和 `develop` 分支。

3. **hotfix 分支**：
   `hotfix` 分支用於修復已經發佈到 `master` 分支的緊急錯誤。當發佈的版本發現重大問題時，可以立即從 `master` 分支創建 `hotfix` 分支，進行修復後，將其合併回 `master` 和 `develop` 分支。

#### 1.3 Git Flow 的流程

Git Flow 的流程大致如下：
- 開發新功能時，從 `develop` 分支創建 `feature` 分支。
- 當 `feature` 分支開發完成後，合併回 `develop` 分支。
- 當代碼達到穩定版本，創建 `release` 分支，進行測試和 bug 修復。
- 測試完成後，將 `release` 分支合併回 `master` 和 `develop` 分支，並標註版本。
- 若發現緊急錯誤，從 `master` 分支創建 `hotfix` 分支，進行修復並合併回 `master` 和 `develop`。

# 二、GitHub Flow 介紹

GitHub Flow 是 GitHub 提出的另一種工作流，主要針對快速迭代和持續集成的開發模式。與 Git Flow 複雜的分支管理相比，GitHub Flow 更加簡單和輕量，適合需要快速交付和頻繁部署的團隊。GitHub Flow 主要有以下幾個步驟：

#### 2.1 GitHub Flow 的基本流程

1. **創建分支**：
   每當開始一個新功能或修復一個 bug 時，都應該從 `main` 分支創建一個新的分支。這個分支通常用來開發新的特性或修復某個問題。

2. **開發與提交**：
   在新創建的分支上進行開發，並定期將代碼提交到遠程倉庫。這些提交應該是增量的，便於代碼審查和測試。

3. **發送 Pull Request**：
   當開發完成後，將自己的分支提交為 Pull Request（PR），並請求團隊成員進行代碼審查。PR 是 GitHub Flow 中的關鍵步驟，能夠確保代碼的質量和協作。

4. **代碼審查與測試**：
   團隊成員進行代碼審查，確保代碼的質量和功能正確性。GitHub Flow 推崇頻繁的測試和集成，因此在 Pull Request 發送後，通常會自動觸發 CI（持續集成）測試，檢查代碼是否有錯誤。

5. **合併分支**：
   經過代碼審查和測試後，Pull Request 被批准，並將代碼合併到 `main` 分支。此時，新的代碼版本已經可以進行部署。

6. **部署與發佈**：
   GitHub Flow 的一大優勢是可以實現持續部署。當代碼合併到 `main` 分支後，可以立即部署到生產環境，快速交付新版本。

#### 2.2 GitHub Flow 的特點

GitHub Flow 的流程非常簡單，沒有像 Git Flow 那樣的複雜分支結構，適合小型和中型的項目。它的優點在於快速迭代和持續交付，並且便於團隊成員協作。GitHub Flow 更加強調分支管理的簡化，並且強調測試和部署的自動化。

# 三、Git Flow 與 GitHub Flow 的比較

- **分支結構**：
  Git Flow 有多個分支（`master`、`develop`、`feature`、`release`、`hotfix`），適用於需要穩定版本發佈的團隊。而 GitHub Flow 只有 `main` 分支和特性分支，適用於快速迭代和持續集成的開發模式。

- **適用場景**：
  Git Flow 更適合複雜的開發流程，尤其是有多個版本和發佈周期的項目。GitHub Flow 更適合快速迭代的小型或中型項目，尤其是需要頻繁部署和交付的團隊。

- **流程複雜度**：
  Git Flow 的流程較為繁瑣，對於小型團隊來說可能會顯得過於複雜。GitHub Flow 流程簡單，適合希望保持敏捷和快速交付的團隊。

# 結論

Git Flow 和 GitHub Flow 各有優缺點，適用的場景也有所不同。選擇哪一種工作流，應根據團隊的規模、項目的複雜度以及發佈頻率來決定。對於需要穩定發佈和多版本管理的項目，Git Flow 是一個更好的選擇。而對於需要快速迭代和頻繁部署的小型項目，GitHub Flow 則是一個更簡單有效的選擇。
---
title: Python 指定使用 OpenSSL 介紹入門教學筆記 | 學習筆記
date: 2024-09-01 02:23:41
authors: kdchang
tags: 
    - OpenSSL
    - python

---

## 前言
如果 `python -c "import ssl; print(ssl.OPENSSL_VERSION)"` 顯示的是 `LibreSSL 2.8.3`，這表示 Python 並沒有使用 Homebrew 安裝的 OpenSSL，而是使用了系統預設的 LibreSSL。這通常發生在 Python 編譯時，沒有正確地連結到 Homebrew 的 OpenSSL 庫。

為了解決這個問題，請按照以下步驟操作：

### 步驟 1：重新安裝 Python 並指定使用 OpenSSL
首先，我們需要確保 Python 使用 Homebrew 安裝的 OpenSSL，而不是系統預設的 LibreSSL。

1. **卸載現有的 Python 版本（如果是從系統預設安裝的）**：

   使用 `pyenv` 安裝 Python 會讓你更方便地管理不同版本的 Python，因此我們建議使用 `pyenv`。

2. **安裝 Homebrew OpenSSL 和 pyenv（如果尚未安裝）**：

   安裝 Homebrew（如果尚未安裝）：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   安裝 pyenv：
   ```bash
   brew install pyenv
   ```

   安裝 Homebrew 的 OpenSSL：
   ```bash
   brew install openssl@3
   ```

3. **配置 pyenv 使用 Homebrew OpenSSL**：

   在 `.zshrc` 或 `.bash_profile` 中添加以下配置來設置編譯環境變數，確保 Python 使用 Homebrew 安裝的 OpenSSL：

   ```bash
   export LDFLAGS="-L/opt/homebrew/opt/openssl@3/lib -L/opt/homebrew/opt/readline/lib -L/opt/homebrew/opt/zlib/lib"
   export CPPFLAGS="-I/opt/homebrew/opt/openssl@3/include -I/opt/homebrew/opt/readline/include -I/opt/homebrew/opt/zlib/include"
   export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@3/lib/pkgconfig"
   ```

   然後運行：
   ```bash
   source ~/.zshrc  # 或者 source ~/.bash_profile
   ```

### 步驟 2：重新安裝 Python 版本
現在，你可以使用 `pyenv` 來安裝 Python，並確保它與 Homebrew 的 OpenSSL 兼容。

1. 安裝 Python 版本（例如，Python 3.9.18）：
   ```bash
   pyenv install 3.9.18
   ```

2. 設置全域 Python 版本：
   ```bash
   pyenv global 3.9.18
   ```

3. 確認 Python 是否正確安裝並使用 OpenSSL：
   ```bash
   python -c "import ssl; print(ssl.OPENSSL_VERSION)"
   ```

如果這時顯示的是 `OpenSSL 1.1.1` 或者更高版本，則說明你已經成功解決了這個問題，並且 Python 現在是使用 Homebrew 安裝的 OpenSSL。

### 步驟 3：創建虛擬環境
如果你使用 `pyenv` 安裝的 Python，並且已經確認它使用了 OpenSSL，那麼可以重新創建虛擬環境：

1. 創建虛擬環境：
   ```bash
   python -m venv .venv
   ```

2. 激活虛擬環境：
   ```bash
   source .venv/bin/activate
   ```

3. 再次檢查 OpenSSL 版本：
   ```bash
   python -c "import ssl; print(ssl.OPENSSL_VERSION)"
   ```

### 步驟 4：安裝其他依賴
在虛擬環境中，我們可以安裝任何其他的套件，並且確保它們與正確的 OpenSSL 版本兼容。

```bash
pip install <package-name>
```
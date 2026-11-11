@echo off
title Minecraft Wiki - GitHubga Push Qilish
color 0b
echo =====================================================================
echo           MINECRAFT WIKI - GITHUBGA KODLARNI YUKLASH
echo =====================================================================
echo.
echo Repozitoriya: https://github.com/abdulazizabduxalilov278/MinecraftWiki
echo.
echo Sizda 2 xil oson usul bor:
echo.
echo [1] Agar GitHub Tokeningiz bo'lsa (https://github.com/settings/tokens):
echo     Uni shu yerga tashlab ENTER bosing.
echo.
echo [2] Agar tokeningiz bo'lmasa, shunchaki ENTER bosing.
echo     Brauzerda GitHub oynasi ochiladi va avtomatik ulanadi.
echo.
echo =====================================================================
set /p TOKEN="Tokenni kiriting (yoki ENTER bosing): "

set "PATH=C:\Users\abdul\git-portable\cmd;C:\Users\abdul\git-portable\mingw64\bin;%PATH%"
cd /d "c:\Users\abdul\Desktop\VC"

echo.
if "%TOKEN%"=="" (
    echo Brauzer orqali GitHubga ulanmoqda va push qilinmoqda...
    git push -u origin main --force
) else (
    echo Token orqali to'g'ridan-to'g'ri push qilinmoqda...
    git push https://%TOKEN%@github.com/abdulazizabduxalilov278/MinecraftWiki.git main --force
)

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo   [MUVAFFAQIYATLI!] Barcha 50 ta fayl GitHubga yuklandi!
    echo   Vercel avtomatik tarzda yangi versiyani build qilib deploy qiladi!
    echo =====================================================================
) else (
    echo.
    echo [XATOLIK] Push amalga oshmadi. Token to'g'riligini tekshiring.
)

echo.
pause

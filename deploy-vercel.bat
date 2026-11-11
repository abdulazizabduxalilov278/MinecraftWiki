@echo off
title MinecraftWiki.uz - Vercel 24/7 Deployer
color 0b
echo =======================================================
echo    MINECRAFTWIKI.UZ - VERCEL 24/7 AVTOMATIK YUKLASH
echo =======================================================
echo.
echo 1-Qadam: Vercel hisobingizga kirish (Login)...
echo Brauzer oynasi ochiladi, Vercel hisobingizni tasdiqlang.
echo.
call npx vercel login
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [XATOLIK] Vercel login amalga oshmadi.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo =======================================================
echo 2-Qadam: Loyihani Production 24/7 serverga yuklash...
echo =======================================================
echo.
call npx vercel --prod --yes
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [XATOLIK] Yuklashda xatolik yuz berdi.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo =======================================================
echo   TABRIKLAYMIZ! SAYTINGIZ VERCELDA 24/7 ISHLAY BOSHLADI!
echo =======================================================
echo Vercel bergan havolani brauzerda ochishingiz mumkin.
echo So'ng Vercel Settings -> Domains bo'limidan MinecraftWiki.uz ni ulang.
echo.
pause

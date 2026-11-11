Add-Type -AssemblyName System.Drawing

$size = 512
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Clear background (transparent)
$g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))

# Outer Glow Rings
for ($i = 20; $i -ge 1; $i--) {
    $alpha = [int](8 * (21 - $i) / 20)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 6, 182, 212), ($i * 2))
    $rect = New-Object System.Drawing.Rectangle(45, 45, 422, 422)
    $g.DrawEllipse($pen, $rect)
    $pen.Dispose()
}

# Main Outer Neon Ring (Cyan #00f2fe)
$ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 6, 214, 255), 18)
$g.DrawEllipse($ringPen, 54, 54, 404, 404)
$ringPen.Dispose()

# Inner Circle Gradient (Cyan -> Sky Blue -> Violet / Purple)
$circleRect = New-Object System.Drawing.Rectangle(72, 72, 368, 368)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(72, 72)),
    (New-Object System.Drawing.PointF(440, 440)),
    [System.Drawing.Color]::FromArgb(255, 0, 180, 240),
    [System.Drawing.Color]::FromArgb(255, 120, 60, 230)
)
$g.FillEllipse($brush, $circleRect)
$brush.Dispose()

# Inner stroke
$innerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 255, 255, 255), 4)
$g.DrawEllipse($innerPen, 74, 74, 364, 364)
$innerPen.Dispose()

# Satellite glowing orb on top right
$satBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 34, 211, 238))
$satPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 15, 23, 42), 6)
$g.FillEllipse($satBrush, 375, 42, 60, 60)
$g.DrawEllipse($satPen, 375, 42, 60, 60)
$satBrush.Dispose()
$satPen.Dispose()

# Magic Wand: angled rounded thick stick
$state = $g.Save()
$g.TranslateTransform(256, 256)
$g.RotateTransform(-40)

# Wand handle / base glow
$wandGlowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(100, 255, 255, 255), 36)
$wandGlowPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$wandGlowPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($wandGlowPen, -110, 0, 110, 0)
$wandGlowPen.Dispose()

# Wand base white body
$wandPen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 26)
$wandPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$wandPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($wandPen, -100, 0, 100, 0)
$wandPen.Dispose()

# Wand tip line divider
$tipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 100, 80, 200), 5)
$g.DrawLine($tipPen, 35, -12, 35, 12)
$tipPen.Dispose()

$g.Restore($state)

# Four-point sparkle stars
function DrawStar($gx, $x, $y, $size) {
    $pts = @(
        (New-Object System.Drawing.PointF($x, ($y - $size))),
        (New-Object System.Drawing.PointF(($x + $size*0.3), ($y - $size*0.3))),
        (New-Object System.Drawing.PointF(($x + $size), $y)),
        (New-Object System.Drawing.PointF(($x + $size*0.3), ($y + $size*0.3))),
        (New-Object System.Drawing.PointF($x, ($y + $size))),
        (New-Object System.Drawing.PointF(($x - $size*0.3), ($y + $size*0.3))),
        (New-Object System.Drawing.PointF(($x - $size), $y)),
        (New-Object System.Drawing.PointF(($x - $size*0.3), ($y - $size*0.3)))
    )
    $b = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $gx.FillPolygon($b, $pts)
    $b.Dispose()
}

DrawStar $g 190 190 28
DrawStar $g 310 320 22
DrawStar $g 240 160 16

$g.Dispose()

# Save PNG in multiple formats
$bmp.Save("C:\Users\abdul\Desktop\VC\public\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("C:\Users\abdul\Desktop\VC\app\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("C:\Users\abdul\Desktop\VC\app\apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Resize for 32x32 favicon
$ico32 = New-Object System.Drawing.Bitmap($bmp, 32, 32)
$ico32.Save("C:\Users\abdul\Desktop\VC\public\favicon.ico", [System.Drawing.Imaging.ImageFormat]::Icon)
$ico32.Save("C:\Users\abdul\Desktop\VC\app\favicon.ico", [System.Drawing.Imaging.ImageFormat]::Icon)
$ico32.Dispose()

$bmp.Dispose()
Write-Output "Generated all icons successfully!"

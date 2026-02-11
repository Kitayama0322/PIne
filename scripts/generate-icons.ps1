$sizes = 192, 512
$dir = "$PSScriptRoot/../icons"

Add-Type -AssemblyName System.Drawing
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

$color = [System.Drawing.Color]::HotPink

foreach ($s in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap $s, $s
  for ($x = 0; $x -lt $s; $x++) {
    for ($y = 0; $y -lt $s; $y++) {
      $bmp.SetPixel($x, $y, $color)
    }
  }
  $bmp.Save("$dir/icon-$s.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}


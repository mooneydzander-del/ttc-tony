# PowerShell script to copy top-down menu images for TC Tacos Catering
# Execute this script in your terminal to move the images to the correct location

$menuDir = Join-Path $PSScriptRoot "assets/menu"
if (-not (Test-Path $menuDir)) {
    New-Item -ItemType Directory -Force -Path $menuDir | Out-Null
    Write-Host "Created assets/menu directory." -ForegroundColor Green
}

$images = @(
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\asada_tacos_top_1780693794085.png"
        Dest   = "asada-tacos.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\al_pastor_tacos_top_1780693806744.png"
        Dest   = "al-pastor-tacos.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\pollo_tacos_top_1780693817757.png"
        Dest   = "pollo-tacos.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\asada_quesadilla_top_1780693830833.png"
        Dest   = "asada-quesadilla.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\al_pastor_quesadilla_top_1780693841363.png"
        Dest   = "al-pastor-quesadilla.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\pollo_quesadilla_top_1780693853304.png"
        Dest   = "pollo-quesadilla.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\quesabirria_top_1780693862743.png"
        Dest   = "quesabirria.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\taco_boxes_top_1780693873477.png"
        Dest   = "taco-boxes.png"
    },
    @{
        Source = "C:\Users\3bros\.gemini\antigravity\brain\383e741d-dc12-4fab-955d-10958bec157c\sodas_1780693620692.png" # Fallback from previous generation
        Dest   = "sodas.png"
    }
)

foreach ($img in $images) {
    $destPath = Join-Path $menuDir $img.Dest
    if (Test-Path $img.Source) {
        Copy-Item -Path $img.Source -Destination $destPath -Force
        Write-Host "Copied to $destPath" -ForegroundColor Cyan
    } else {
        Write-Warning "Source image not found: $($img.Source)"
    }
}

Write-Host "All top-down PNG slider images copied successfully!" -ForegroundColor Green

#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Download space background
curl -o public/space-bg.jpg "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"

# Download planets (using placeholder images for now)
curl -o public/planet1.png "https://raw.githubusercontent.com/your-username/your-repo/main/public/planet1.png"
curl -o public/planet2.png "https://raw.githubusercontent.com/your-username/your-repo/main/public/planet2.png"

# Download profile photo
curl -o public/profile.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"

# Download project screenshots
curl -o public/project1.jpg "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
curl -o public/project2.jpg "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
curl -o public/project3.jpg "https://images.unsplash.com/photo-1555066931-bf19f8fd3865?q=80&w=2071&auto=format&fit=crop" 
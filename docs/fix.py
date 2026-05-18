import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the original nav
nav_start = content.find('<nav>')
nav_end = content.find('</nav>', nav_start) + len('</nav>')
if nav_start != -1 and nav_end != -1:
    original_nav = """  <nav>
    <div>
      <a class="nav-logo" href="#"><span>Protect</span>MyWindshield</a>
      <div class="nav-tagline">Making You and your car cooler.</div>
    </div>
    <div class="nav-right" id="navMenu">
      <a class="nav-link" href="#form" onclick="closeMenu()">Order Now</a>
      <a class="nav-link" href="#how" onclick="closeMenu()">How It Works</a>
      <a class="nav-link" href="#faq" onclick="closeMenu()">FAQ</a>
      <a class="nav-link" href="#about" onclick="closeMenu()">About Us</a>
      <a class="nav-cta" href="#form" onclick="closeMenu()">
        Car Cover
      </a>
    </div>
  </nav>"""
    content = content[:nav_start] + original_nav + content[nav_end:]

# 2. Unhide card-product
content = content.replace('<div class="card" id="card-product" style="display:none;">', '<div class="card" id="card-product">')

# 3. Fix step numbers
content = content.replace('<div class="card-step" id="step2-num">1</div>', '<div class="card-step" id="step2-num">2</div>')
content = content.replace('<div class="card-step" id="step3-num">2</div>', '<div class="card-step" id="step3-num">3</div>')
content = content.replace('<div class="card-step" id="step4-num">3</div>', '<div class="card-step" id="step4-num">4</div>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done restoring index.html")

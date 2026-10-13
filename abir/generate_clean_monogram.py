import math
from PIL import Image, ImageFont, ImageDraw, ImageFilter, ImageChops

# Target canvas
W, H = 1400, 1150
final = Image.new('RGBA', (W, H), (0, 0, 0, 0))

# 1. LETTERS A & N MASK
font_path = 'src/assets/fonts/CinzelDecorative-Bold.ttf'
font_size = 460
font = ImageFont.truetype(font_path, font_size)

mask = Image.new('L', (W, H), 0)
d_mask = ImageDraw.Draw(mask)

# Position A and N
pos_a = (330, 320)
pos_n = (620, 320)

d_mask.text(pos_a, 'A', font=font, fill=255)
d_mask.text(pos_n, 'N', font=font, fill=255)

# 2. CREATE METALLIC GOLD TEXTURE
gold_tex = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d_gold = ImageDraw.Draw(gold_tex)

# Vertical multi-stop gradient for realistic 3D gold reflection
for y in range(H):
    rel = y / H
    if rel < 0.25:
        r = int(218 + (255 - 218) * (rel / 0.25))
        g = int(165 + (240 - 165) * (rel / 0.25))
        b = int(60 + (170 - 60) * (rel / 0.25))
    elif rel < 0.45:
        r = int(255 - (255 - 200) * ((rel - 0.25) / 0.2))
        g = int(240 - (240 - 145) * ((rel - 0.25) / 0.2))
        b = int(170 - (170 - 45) * ((rel - 0.25) / 0.2))
    elif rel < 0.70:
        r = int(200 + (250 - 200) * ((rel - 0.45) / 0.25))
        g = int(145 + (215 - 145) * ((rel - 0.45) / 0.25))
        b = int(45 + (125 - 45) * ((rel - 0.45) / 0.25))
    else:
        r = int(250 - (250 - 140) * ((rel - 0.70) / 0.3))
        g = int(215 - (215 - 85) * ((rel - 0.70) / 0.3))
        b = int(125 - (125 - 25) * ((rel - 0.70) / 0.3))
    d_gold.line([(0, y), (W, y)], fill=(r, g, b, 255))

# 3. 3D BEVEL LIGHTING & INNER SHADOW
# Top-left highlight
mask_hi = ImageChops.subtract(
    mask,
    ImageChops.offset(mask, 3, 3)
).filter(ImageFilter.GaussianBlur(1.5))

# Bottom-right shadow
mask_lo = ImageChops.subtract(
    mask,
    ImageChops.offset(mask, -3, -3)
).filter(ImageFilter.GaussianBlur(1.5))

letters = Image.new('RGBA', (W, H), (0, 0, 0, 0))
letters.paste(gold_tex, (0, 0), mask)

# Highlight overlay
hi_layer = Image.new('RGBA', (W, H), (255, 255, 220, 210))
letters.paste(hi_layer, (0, 0), mask_hi)

# Shadow overlay
lo_layer = Image.new('RGBA', (W, H), (80, 45, 15, 220))
letters.paste(lo_layer, (0, 0), mask_lo)

# Stroke outline
stroke_mask = ImageChops.subtract(
    mask.filter(ImageFilter.MaxFilter(5)),
    mask.filter(ImageFilter.MinFilter(3))
)
stroke_layer = Image.new('RGBA', (W, H), (140, 85, 25, 235))
letters.paste(stroke_layer, (0, 0), stroke_mask)

# Drop shadow
shadow_mask = mask.filter(ImageFilter.GaussianBlur(18))
shadow_layer = Image.new('RGBA', (W, H), (60, 35, 18, 100))
final.paste(shadow_layer, (0, 15), shadow_mask)

# 4. BOTANICAL WREATH (Drawn with smooth math formulas)
def draw_leaf(img, cx, cy, length, angle, col1, col2):
    # Oval leaf rotated
    leaf_canvas = Image.new('RGBA', (length * 3, length * 3), (0, 0, 0, 0))
    d = ImageDraw.Draw(leaf_canvas)
    ox, oy = length * 1.5, length * 1.5
    # Leaf path
    w = length * 0.45
    pts = [
        (ox, oy - length),
        (ox + w, oy - length * 0.4),
        (ox + w * 0.8, oy + length * 0.4),
        (ox, oy + length),
        (ox - w * 0.8, oy + length * 0.4),
        (ox - w, oy - length * 0.4),
    ]
    d.polygon(pts, fill=col1, outline=(60, 70, 30, 200))
    d.line([(ox, oy - length * 0.8), (ox, oy + length * 0.8)], fill=col2, width=2)
    # Rotate
    rotated = leaf_canvas.rotate(angle, resample=Image.Resampling.BICUBIC)
    # Paste
    px = int(cx - rotated.width / 2)
    py = int(cy - rotated.height / 2)
    img.paste(rotated, (px, py), rotated)

def draw_flower(img, cx, cy, radius, angle):
    fl_canvas = Image.new('RGBA', (radius * 4, radius * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(fl_canvas)
    ox, oy = radius * 2, radius * 2
    # 5 Petals
    for i in range(5):
        a = i * (2 * math.pi / 5)
        px = ox + math.cos(a) * radius * 0.8
        py = oy + math.sin(a) * radius * 0.8
        # Petal ellipse
        d.ellipse([px - radius * 0.6, py - radius * 0.8, px + radius * 0.6, py + radius * 0.8],
                  fill=(252, 185, 202, 235), outline=(218, 115, 145, 210))
    # Center golden stamen
    d.circle((ox, oy), radius * 0.35, fill=(255, 220, 100, 255), outline=(180, 120, 30, 220))
    rotated = fl_canvas.rotate(angle, resample=Image.Resampling.BICUBIC)
    px = int(cx - rotated.width / 2)
    py = int(cy - rotated.height / 2)
    img.paste(rotated, (px, py), rotated)

wreath_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d_wreath = ImageDraw.Draw(wreath_layer)

# Draw Left Branch Curve
left_points = []
for t in range(100):
    rel = t / 100.0
    # Arch from bottom (480, 950) curving out to (180, 600) up to (330, 280)
    x = (1 - rel)**2 * 480 + 2 * (1 - rel) * rel * 160 + rel**2 * 360
    y = (1 - rel)**2 * 960 + 2 * (1 - rel) * rel * 620 + rel**2 * 270
    left_points.append((x, y))

d_wreath.line(left_points, fill=(110, 75, 45, 240), width=6)

# Draw Leaves along left branch
for idx in range(10, 90, 8):
    pt = left_points[idx]
    dx = left_points[idx+1][0] - left_points[idx-1][0]
    dy = left_points[idx+1][1] - left_points[idx-1][1]
    base_angle = math.degrees(math.atan2(dy, dx))
    # alternating leaves
    side = 1 if (idx // 8) % 2 == 0 else -1
    leaf_angle = base_angle + side * 55
    col_leaf = (125, 145, 75, 245) if side == 1 else (150, 168, 92, 245)
    draw_leaf(wreath_layer, pt[0], pt[1], 44, -leaf_angle, col_leaf, (85, 105, 45, 200))

# Draw Flowers Left Branch
draw_flower(wreath_layer, 230, 640, 38, -20)
draw_flower(wreath_layer, 275, 480, 32, 15)
draw_flower(wreath_layer, 360, 800, 28, -35)

# Draw Right Branch Curve
right_points = []
for t in range(100):
    rel = t / 100.0
    # Mirrored arch
    x = (1 - rel)**2 * (W - 480) + 2 * (1 - rel) * rel * (W - 160) + rel**2 * (W - 360)
    y = (1 - rel)**2 * 960 + 2 * (1 - rel) * rel * 620 + rel**2 * 270
    right_points.append((x, y))

d_wreath.line(right_points, fill=(110, 75, 45, 240), width=6)

for idx in range(10, 90, 8):
    pt = right_points[idx]
    dx = right_points[idx+1][0] - right_points[idx-1][0]
    dy = right_points[idx+1][1] - right_points[idx-1][1]
    base_angle = math.degrees(math.atan2(dy, dx))
    side = 1 if (idx // 8) % 2 == 0 else -1
    leaf_angle = base_angle - side * 55
    col_leaf = (125, 145, 75, 245) if side == 1 else (150, 168, 92, 245)
    draw_leaf(wreath_layer, pt[0], pt[1], 44, -leaf_angle, col_leaf, (85, 105, 45, 200))

# Draw Flowers Right Branch
draw_flower(wreath_layer, W - 230, 640, 38, 20)
draw_flower(wreath_layer, W - 275, 480, 32, -15)
draw_flower(wreath_layer, W - 360, 800, 28, 35)

# 5. COMPOSITE EVERYTHING
# Paste Botanical wreath
final.paste(wreath_layer, (0, 0), wreath_layer)

# Paste 3D Gold Letters
final.paste(letters, (0, 0), mask)

# Paste Clean Royal Crown
crown = Image.open('public/assets/test_crown.png')
# Crown scaled and centered horizontally
crown_w, crown_h = int(crown.width * 1.15), int(crown.height * 1.15)
crown_scaled = crown.resize((crown_w, crown_h), Image.Resampling.LANCZOS)
crown_x = int((W - crown_w) / 2)
crown_y = 110
final.paste(crown_scaled, (crown_x, crown_y), crown_scaled)

# Save result
final.save('public/assets/monogram-an-transparent.png')
print('Successfully generated clean professional monogram-an-transparent.png!')

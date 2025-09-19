import zipfile, json, sys

# ---- Ändra filnamnet här till din CRX ----
crx_file = "RensaWebbdata_v1.0.2.crx"

with zipfile.ZipFile(crx_file, 'r') as z:
    with z.open('manifest.json') as manifest_file:
        manifest = json.load(manifest_file)

print(f"Namn: {manifest.get('name')}")
print(f"Version: {manifest.get('version')}")

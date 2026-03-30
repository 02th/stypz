import os
import sys

filepath = "/root/stypzapi/routers/user.py"
with open(filepath, "r") as f:
    content = f.read()

if "disposable" not in content:
    content = content.replace("from passlib.context import CryptContext", "from passlib.context import CryptContext\nfrom disposable_email_domains import blocklist")
    content = content.replace(
        "    if existing:",
        "    domain = body.email.split('@')[-1].lower()\n    if domain in blocklist:\n        raise HTTPException(status_code=400, detail=\"Disposable email addresses are not allowed\")\n\n    if existing:"
    )

with open(filepath, "w") as f:
    f.write(content)
print("patched")

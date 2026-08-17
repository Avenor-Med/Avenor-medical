# Post-refactor cleanup — run once

The refactor copied everything into `src/`. OneDrive file locks prevented
deleting the old directories from this environment, so remove them manually
before the first build:

```powershell
cd C:\dev\avenor-medical\avenor-app
Remove-Item -Recurse -Force app, components, lib
```

Next.js will not start while both `app/` and `src/app/` exist — this step is
required, not optional.

After removing them:

```powershell
npm install
npm run typecheck
npm run build
```

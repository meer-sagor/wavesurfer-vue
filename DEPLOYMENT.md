# Deployment Guide

This guide explains how to deploy the `@meersagor/wavesurfer-vue` package to NPM.

## Prerequisites

Before deploying, make sure you have:

1. **Node.js** and **Yarn** installed
2. **Git** configured with your GitHub credentials
3. **NPM** account and logged in (`npm login`)
4. Write access to the GitHub repository

## Deployment Workflow

### Option 1: Using the Deploy Script (Recommended)

The easiest way to deploy is using the provided `deploy.sh` script:

```bash
# Make sure the script is executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

Or using yarn:
```bash
yarn deploy
```

This script will:
1. ✅ Check prerequisites (Node.js, Yarn, Git, NPM login)
2. 🔨 Build the project and run type checking
3. 📝 Generate changelog using changesets
4. 💾 Commit and push changes to GitHub
5. 🏷️ Create and push a git tag
6. 📦 Publish to NPM

### Option 2: Manual Deployment

If you prefer to run the steps manually:

#### 1. Create Changesets (if needed)

When you make changes that should be documented in the changelog:

```bash
yarn changeset
```

This will prompt you to:
- Select which packages changed
- Choose the type of change (patch, minor, major)
- Write a description of the changes

#### 2. Build and Deploy

```bash
# Install dependencies
yarn install

# Run type checking
yarn type-check

# Build the project
yarn build

# Version the changesets and update changelog
yarn version

# Commit and push changes
git add .
git commit -m "chore: release v$(node -p "require('./package.json').version")"
git push origin master

# Create and push tag
git tag "v$(node -p "require('./package.json').version")"
git push origin "v$(node -p "require('./package.json').version")"

# Publish to NPM
npm publish
```

## Version Management

This project uses [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.

### Creating Changesets

When you make changes that should be documented:

1. Run `yarn changeset` or `npm run changeset`
2. Select the packages that changed
3. Choose the version bump type:
   - **patch**: Bug fixes and minor changes
   - **minor**: New features (backward compatible)
   - **major**: Breaking changes
4. Write a description of the changes

### Versioning Changesets

When ready to release:

```bash
yarn version
```

This will:
- Update the version in `package.json`
- Generate/update the `CHANGELOG.md`
- Create a commit with the version changes

## Troubleshooting

### Common Issues

1. **"Not logged in to NPM"**
   ```bash
   npm login
   ```

2. **"No changesets found"**
   - Create a changeset first: `yarn changeset`
   - Or force a patch version: `yarn changeset version --patch`

3. **"Uncommitted changes"**
   - Commit or stash your changes before deploying
   - The script will warn you about this

4. **"Permission denied"**
   - Make sure the deploy script is executable: `chmod +x deploy.sh`

### Rollback

If something goes wrong:

1. **Unpublish from NPM** (within 72 hours):
   ```bash
   npm unpublish @meersagor/wavesurfer-vue@<version>
   ```

2. **Delete the git tag**:
   ```bash
   git tag -d v<version>
   git push origin :refs/tags/v<version>
   ```

3. **Revert the commit**:
   ```bash
   git revert <commit-hash>
   git push origin master
   ```

## Best Practices

1. **Always test locally** before deploying
2. **Create changesets** for all user-facing changes
3. **Use semantic versioning** appropriately
4. **Review the changelog** before publishing
5. **Test the published package** after deployment

## Support

If you encounter issues with deployment, check:
- [Changesets documentation](https://github.com/changesets/changesets)
- [NPM publishing guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

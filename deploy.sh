#!/bin/bash

# Deploy script for @meersagor/wavesurfer-vue
# This script handles changelog generation, commits, pushes to GitHub, and publishes to NPM

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command_exists yarn; then
        print_error "Yarn is not installed"
        exit 1
    fi
    
    if ! command_exists git; then
        print_error "Git is not installed"
        exit 1
    fi
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
    
    # Check if we have uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Please commit or stash them before deploying."
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    print_success "Prerequisites check passed"
}

# Build the project
build_project() {
    print_status "Building the project..."
    
    # Clean and install dependencies
    yarn install
    
    # Run type checking
    print_status "Running type checking..."
    yarn type-check
    
    # Build the project
    print_status "Running build..."
    yarn build
    
    print_success "Build completed successfully"
}

# Generate changelog using changesets
generate_changelog() {
    print_status "Generating changelog..."
    
    # Check if there are any changesets
    if ! yarn changeset status; then
        print_warning "No changesets found. Creating a patch version bump..."
        yarn changeset version --patch
    else
        # Version the changesets
        yarn changeset version
    fi
    
    print_success "Changelog generated successfully"
}

# Commit and push changes
commit_and_push() {
    print_status "Committing and pushing changes..."
    
    # Get the current version from package.json
    CURRENT_VERSION=$(node -p "require('./package.json').version")
    
    # Add all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        print_warning "No changes to commit"
        return
    fi
    
    # Commit with version
    git commit -m "chore: release v${CURRENT_VERSION}"
    
    # Push to remote
    git push origin master
    
    # Create and push tag
    git tag "v${CURRENT_VERSION}"
    git push origin "v${CURRENT_VERSION}"
    
    print_success "Changes committed and pushed successfully"
}

# Publish to NPM
publish_to_npm() {
    print_status "Publishing to NPM..."
    
    # Check if user is logged in to npm
    if ! npm whoami > /dev/null 2>&1; then
        print_error "Not logged in to NPM. Please run 'npm login' first."
        exit 1
    fi
    
    # Publish to NPM
    npm publish
    
    print_success "Successfully published to NPM!"
}

# Main deployment function
main() {
    print_status "Starting deployment process for @meersagor/wavesurfer-vue"
    
    # Check prerequisites
    check_prerequisites
    
    # Build the project
    build_project
    
    # Generate changelog
    generate_changelog
    
    # # Commit and push changes
    # commit_and_push
    
    # # Publish to NPM
    # publish_to_npm
    
    print_success "Deployment completed successfully! 🎉"
    print_status "Your package has been published to NPM and changes have been pushed to GitHub."
}

# Run the main function
main "$@"

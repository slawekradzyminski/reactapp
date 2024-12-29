#!/bin/bash

# Check if a commit message was provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./git-commit.sh \"your commit message\""
    exit 1
fi

# Stage all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to the current branch
git push 
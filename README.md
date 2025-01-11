Project URL - https://roadmap.sh/projects/github-user-activity

GitHub User Activity CLI

This is a simple command-line interface (CLI) tool that fetches the recent activity of a GitHub user using the GitHub API.

Features:

Fetches the last 10 recent activities of the specified user.
Handles various event types (PushEvent, IssuesEvent, PullRequestEvent, etc.) and provides user-friendly descriptions.
Includes basic error handling for invalid usernames, network issues, and API response parsing errors.
Usage:

Installation:

Ensure Node.js is installed on your system.
Save the code as a JavaScript file (e.g., github-activity.js).
Run the script:

Bash

node github-activity.js <username>
Replace <username> with the GitHub username of the user you want to check.

Example:

Bash

node github-activity.js john-doe

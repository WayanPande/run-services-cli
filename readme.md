# run-services

## Project Runner CLI

This CLI application helps me to manage and run multiple React micro-frontend projects at CIMB Niaga within a `tmux` session. It allows you to select which repositories to start, providing a streamlined development workflow.

## Features

-   Select project type.
-   Automatically discover repositories based on the selected type.
-   Multi-select specific repositories to run.
-   Launches selected repositories in a new `tmux` session.
-   Graceful handling of `tmux` sessions.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd run-services
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Link the CLI globally (for development/testing):**
    ```bash
    npm run build
    npm link
    ```
    Now you can run the CLI from any directory using `run-services`.

## Usage

To start the CLI:

```bash
run-services
```

Follow the on-screen prompts:

1.  Select the project type (bbo or bfo).
2.  Select the repositories you wish to run (use `space` to select/deselect, `enter` to confirm).
3.  Confirm your selection.

The CLI will then launch the selected projects in a new `tmux` session. You can detach from the `tmux` session and reattach later if needed.

## Development

To run the CLI in development mode (with hot-reloading):

```bash
npm run start
```
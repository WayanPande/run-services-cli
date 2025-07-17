# run-services

## Project Runner CLI

This CLI application helps you manage and run multiple micro-frontend projects. It's designed to work on macOS, Linux, and Windows.

## Features

-   Select project type.
-   Automatically discover repositories based on the selected type.
-   Multi-select specific repositories to run.
-   Launches selected repositories in parallel using either `tmux` (if available) or `concurrently`.
-   Graceful handling of `tmux` sessions.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone run-services-cli
    cd run-services-cli
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build and Link the CLI:**
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
3.  If you have `tmux` installed, you'll be asked to choose between `tmux` and `concurrently`. If you don't have `tmux`, it will automatically use `concurrently`.
4.  Confirm your selection.

The CLI will then launch the selected projects in parallel.

## Development

To run the CLI in development mode (with hot-reloading):

```bash
npm run start
```
#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';
import { execa } from 'execa';

const main = async () => {
    const onConfirm = async (selectedRepos: Array<{ label: string; value: string }>) => {
        const sessionName = 'multi_react_apps';

        try {
            await execa('tmux', ['has-session', '-t', sessionName]);
            await execa('tmux', ['kill-session', '-t', sessionName]);
        } catch (error) {
            // No existing session, safe to ignore
        }

        await execa('tmux', ['new-session', '-d', '-s', sessionName]);

        for (const repo of selectedRepos) {
            const repoName = repo.label;
            await execa('tmux', ['new-window', '-t', sessionName, '-n', repoName]);
            await execa('tmux', [
                'send-keys',
                '-t',
                `${sessionName}:${repoName}`,
                `cd ${repo.value} && npm start`,
                'C-m',
            ]);
        }

        unmount();

        try {
            await execa('tmux', ['attach', '-t', sessionName], { stdio: 'inherit' });
        } catch (error) {
            // Ignore error when tmux session is closed
        }
    };

    const { unmount } = render(<App onConfirm={onConfirm} />);
};

main();


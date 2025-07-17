import React, { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import MultiSelect from "./components/MultiSelect.js";
import * as fs from "fs";
import * as path from "path";
import BigText from "ink-big-text";

interface AppProps {
	onConfirm: (
		selectedRepos: Array<{ label: string; value: string }>,
		tool: "tmux" | "concurrently"
	) => void;
	hasTmux: boolean;
}

export default function App({ onConfirm, hasTmux }: AppProps) {
	const [projectType, setProjectType] = useState<"bbo" | "bfo" | null>(null);
	const [repos, setRepos] = useState<{ label: string; value: string }[]>([]);
	const [selectedRepos, setSelectedRepos] = useState<
		{ label: string; value: string }[]
	>([]);
	const [step, setStep] = useState("projectType");
	const [tool, setTool] = useState<"tmux" | "concurrently" | null>(null);

	useEffect(() => {
		if (projectType) {
			const prefix = projectType === "bbo" ? "mfe-bbo-" : "mfe-bfo-";
			const currentDir = process.cwd();
			const files = fs.readdirSync(currentDir);
			const filteredRepos = files
				.filter(
					(file) =>
						fs.statSync(path.join(currentDir, file)).isDirectory() &&
						file.startsWith(prefix)
				)
				.map((repo) => ({ label: repo, value: repo }));

			if (filteredRepos.length === 0) {
				setStep("noReposFound");
			} else {
				setRepos(filteredRepos);
				setStep("selectRepos");
			}
		}
	}, [projectType]);

	useInput((input) => {
		if (step === "projectType") {
			if (input === "1") {
				setProjectType("bbo");
			} else if (input === "2") {
				setProjectType("bfo");
			}
		} else if (step === "selectTool") {
			if (input === "1") {
				setTool("tmux");
				setStep("confirm");
			} else if (input === "2") {
				setTool("concurrently");
				setStep("confirm");
			}
		} else if (step === "confirm") {
			if (input.toLowerCase() === "y") {
				onConfirm(selectedRepos, tool!);
			} else if (input.toLowerCase() === "n") {
				setStep("selectRepos");
			}
		}
	});

	const handleSelectRepos = (selected: { label: string; value: string }[]) => {
		setSelectedRepos(selected);
		if (hasTmux) {
			setStep("selectTool");
		} else {
			setTool("concurrently");
			setStep("confirm");
		}
	};

	const handleBack = () => {
		setStep("projectType");
		setProjectType(null);
	};

	const renderHeader = () => (
		<Box flexDirection="column" alignItems="center" marginBottom={1}>
			<BigText text="MF Orchestrator" font="tiny" colors={["red", "red"]} />
			<Text bold color="gray">
				Run Multiple Repo at Once 🔥🔥🔥🔥🔥
			</Text>
		</Box>
	);

	if (step === "projectType") {
		return (
			<Box flexDirection="column" padding={2}>
				{renderHeader()}
				<Text bold>Select the project type:</Text>
				<Box paddingLeft={2} marginTop={1}>
					<Text bold>
						1. <Text color="cyan">BBO</Text>
					</Text>
				</Box>
				<Box paddingLeft={2}>
					<Text bold>
						2. <Text color="cyan">BFO</Text>
					</Text>
				</Box>
			</Box>
		);
	}

	if (step === "selectRepos") {
		const defaultSelected = new Set<string>();
		repos.forEach((repo) => {
			if (
				["stitcher", "menu", "login", "banner"].some((defaultRepo) =>
					repo.label.includes(defaultRepo)
				)
			) {
				defaultSelected.add(repo.value);
			}
		});

		return (
			<Box flexDirection="column" padding={2}>
				{renderHeader()}
				<MultiSelect
					items={repos}
					onSubmit={handleSelectRepos}
					onBack={handleBack}
					defaultSelected={defaultSelected}
				/>
			</Box>
		);
	}

	if (step === "selectTool") {
		return (
			<Box flexDirection="column" padding={2}>
				{renderHeader()}
				<Text bold>Select the tool to run the repositories:</Text>
				<Box paddingLeft={2} marginTop={1}>
					<Text bold>
						1. <Text color="cyan">Tmux</Text> (recommended for advanced users)
					</Text>
				</Box>
				<Box paddingLeft={2}>
					<Text bold>
						2. <Text color="cyan">Concurrently</Text> (cross-platform)
					</Text>
				</Box>
			</Box>
		);
	}

	if (step === "confirm") {
		return (
			<Box flexDirection="column" padding={2}>
				{renderHeader()}
				<Text bold>
					The following repositories will be started using {tool}:
				</Text>
				<Box flexDirection="column" marginTop={1} marginBottom={1}>
					{selectedRepos.map((repo) => (
						<Box key={repo.value} paddingLeft={2}>
							<Text color="green">✓ {repo.label}</Text>
						</Box>
					))}
				</Box>
				<Text>
					Press{" "}
					<Text bold color="green">
						y
					</Text>{" "}
					to confirm,{" "}
					<Text bold color="red">
						n
					</Text>{" "}
					to go back.
				</Text>
			</Box>
		);
	}

	if (step === "noReposFound") {
		return (
			<Box flexDirection="column" padding={2}>
				{renderHeader()}
				<Text color="red" bold>
					No repositories found with the selected prefix (BBO or BFO).
				</Text>
			</Box>
		);
	}

	return null;
}

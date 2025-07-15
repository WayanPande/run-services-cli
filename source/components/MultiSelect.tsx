import React, { useState, FC } from "react";
import { Box, Text, useInput } from "ink";

interface Item {
	label: string;
	value: string;
}

interface MultiSelectProps {
	items: Item[];
	onSubmit: (selected: Item[]) => void;
	onBack: () => void;
	defaultSelected?: Set<string>;
}

const MultiSelect: FC<MultiSelectProps> = ({
	items,
	onSubmit,
	onBack,
	defaultSelected = new Set(),
}) => {
	const [cursor, setCursor] = useState(0);
	const [selected, setSelected] = useState<Set<string>>(defaultSelected);

	useInput((input, key) => {
		if (key.upArrow) {
			setCursor(Math.max(0, cursor - 1));
		}

		if (key.downArrow) {
			setCursor(Math.min(items.length - 1, cursor + 1));
		}

		if (input === " ") {
			const currentItem = items[cursor];
			if (currentItem) {
				const newSelected = new Set(selected);
				if (newSelected.has(currentItem.value)) {
					newSelected.delete(currentItem.value);
				} else {
					newSelected.add(currentItem.value);
				}
				setSelected(newSelected);
			}
		}

		if (key.return) {
			const selectedItems = items.filter((item) => selected.has(item.value));
			onSubmit(selectedItems);
		}

		if (input === "b") {
			onBack();
		}
	});

	return (
		<Box flexDirection="column">
			<Text bold>
				Select repositories to run (press{" "}
				<Text bold color="green">
					space
				</Text>{" "}
				to select,{" "}
				<Text bold color="green">
					enter
				</Text>{" "}
				to submit,{" "}
				<Text bold color="red">
					b
				</Text>{" "}
				to go back):
			</Text>
			{items.map((item, index) => (
				<Box key={item.value} paddingLeft={2}>
					<Text color={cursor === index ? "cyan" : undefined}>
						{cursor === index ? ">" : " "}
						{selected.has(item.value) ? (
							<Text color="green">[x]</Text>
						) : (
							<Text>[ ]</Text>
						)}
						<Text> {item.label}</Text>
					</Text>
				</Box>
			))}
		</Box>
	);
};

export default MultiSelect;

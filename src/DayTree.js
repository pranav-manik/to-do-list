import * as React from "react";

import { Classes, Icon, Intent, ITreeNode, Position, Tooltip, Tree } from "@blueprintjs/core";

export default class DayTree extends React.Component {

    constructor(props) {
        super(props);

        this.state = { nodes: INITIAL_STATE };
        this.handleNodeClick = (nodeData, _nodePath, e) => {
            const originallySelected = nodeData.isSelected;
            if (!e.shiftKey) {
                this.forEachNode(this.state.nodes, n => (n.isSelected = false));
            }
            nodeData.isSelected = originallySelected == null ? true : !originallySelected;
            this.setState(this.state);
        };

        this.handleNodeCollapse = (nodeData) => {
            nodeData.isExpanded = false;
            this.setState(this.state);
        };

        this.handleNodeExpand = (nodeData) => {
            nodeData.isExpanded = true;
            this.setState(this.state);
        };

    }

    render() {
        return (
            <div>
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
            </div>
        );
    }

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }
        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

}

const INITIAL_STATE = [
    {
        id: 0,
        hasCaret: true,
        icon: "folder-close",
        label: "Folder 0",
    },
    {
        id: 1,
        icon: "folder-close",
        isExpanded: true,
        label: (
            <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
                Folder 1
            </Tooltip>
        ),
        childNodes: [
            {
                id: 2,
                icon: "document",
                label: "Item 0",
                secondaryLabel: (
                    <Tooltip content="An eye!">
                        <Icon icon="eye-open" />
                    </Tooltip>
                ),
            },
            {
                id: 3,
                icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
                label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
            },
            {
                id: 4,
                hasCaret: true,
                icon: "folder-close",
                label: (
                    <Tooltip content="foo" position={Position.RIGHT}>
                        Folder 2
                    </Tooltip>
                ),
                childNodes: [
                    { id: 5, label: "No-Icon Item" },
                    { id: 6, icon: "tag", label: "Item 1" },
                    {
                        id: 7,
                        hasCaret: true,
                        icon: "folder-close",
                        label: "Folder 3",
                        childNodes: [
                            { id: 8, icon: "document", label: "Item 0" },
                            { id: 9, icon: "tag", label: "Item 1" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        hasCaret: true,
        icon: "folder-close",
        label: "Super secret files",
        disabled: true,
    },
];
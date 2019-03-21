const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let tmp = new Node(data, priority);
		this.insertNode(tmp);
		this.shiftNodeUp(tmp);
		this.length += 1;
	}

	pop() {
		if(this.isEmpty()) {
			return;
		}
		let detached = this.detachRoot();
		this.length -= 1;
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
	}

	detachRoot() {
		let heapRoot = this.root;
		this.root = null;
		if(this.parentNodes[0] === heapRoot) {
			this.parentNodes.shift();
		}
		return heapRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length === 0) {
			return;
		}
		let last = this.parentNodes.pop();
		let leftOfOldRoot;
		let rightOfOldRoot;
		this.root = last;
		if (last.parent && last === last.parent.right && last !== detached.right) {
			this.parentNodes.unshift(last.parent);
		}
		if (detached.left) {
			leftOfOldRoot = detached.left;
			detached.removeChild(detached.left);
		}
		if (detached.right) {
			rightOfOldRoot = detached.right;
			detached.removeChild(detached.right);
		}
		if (last.parent) {
			last.parent.removeChild(last);
		}
		if (leftOfOldRoot && leftOfOldRoot !== last) {
			last.appendChild(leftOfOldRoot);
		}
		if (rightOfOldRoot && rightOfOldRoot !== last) {
			last.appendChild(rightOfOldRoot);
		}
		if (!last.right) {
			this.parentNodes.unshift(last);
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if(this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		this.parentNodes[0].appendChild(node);
		this.parentNodes.push(node);
		if(this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (node === node.parent.right) {
				this.parentNodes.pop();
				this.parentNodes.push(node.parent);
			} else if (node === node.parent.left && !node.parent.right) {
				[this.parentNodes[0],this.parentNodes[this.parentNodes.length - 1]] = [this.parentNodes[this.parentNodes.length - 1],this.parentNodes[0]];	
			} else if (node.left && !node.right) {
				this.parentNodes[0] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else {
			return;
		}
		if (!node.parent) {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let target;
		if (!node) {
			return;
		}
		if (node.left && node.right && node.left.priority > node.priority && node.right.priority > node.priority) {
			if (node.left.priority > node.right.priority) {
				target = node.left;
			}	else {
				target = node.right;
			}
		} else if (node.left && node.left.priority > node.priority) {
			target = node.left;
		}	else if (node.right && node.right.priority > node.priority){
			target = node.right;
		} else {
			return;
		}
		if (target) {
			if (this.root === node) {
				this.root = target
			}
			if (this.parentNodes.includes(target) && this.parentNodes.includes(node)) {
				[this.parentNodes[0],this.parentNodes[this.parentNodes.length - 1]] = [this.parentNodes[this.parentNodes.length - 1],this.parentNodes[0]];	
			} else if (this.parentNodes.includes(target)) {
				this.parentNodes[this.parentNodes.indexOf(target)] = node;
			}
			target.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;

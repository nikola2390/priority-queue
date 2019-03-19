class Node {
  constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
		return this;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error;
		}
		return this;
	}

	remove() {
		if(!this.parent) {return this;}
		this.parent.removeChild(this);
		return this;
	}

	swapWithParent() {
		if(!this.parent) { return this;}
		let parentOfThis = this.parent;
		let parentOfParent = this.parent.parent;
		let leftOfThis = this.left;
		let rightOfThis = this.right;
		let leftOfParent = this.parent.left;
		let rightOfParent = this.parent.right;
		if(parentOfParent) { parentOfParent.removeChild(parentOfThis); }
		if(leftOfThis) { this.removeChild(leftOfThis); }
		if(rightOfThis) { this.removeChild(rightOfThis); }
		if(leftOfParent) { parentOfThis.removeChild(leftOfParent); }
		if(rightOfParent) { parentOfThis.removeChild(rightOfParent); }
		if(parentOfParent) { parentOfParent.appendChild(this); }
		if(leftOfThis) { parentOfThis.appendChild(leftOfThis); }
		if(rightOfThis) { parentOfThis.appendChild(rightOfThis); }
		if(this === leftOfParent) {
			this.appendChild(parentOfThis);
			if(rightOfParent) { this.appendChild(rightOfParent); }
		} else {
			if(leftOfParent) { this.appendChild(leftOfParent); }
			this.appendChild(parentOfThis);
		}
	}
}

module.exports = Node;

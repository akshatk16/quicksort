let bars = [];
let thickness = 2;
let states = [];
let done = 0

function setup() {
	let play = 1;
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-div');
	resetSketch()
	reset = select('#reset')
	reset.mousePressed(resetSketch)
}




function resetSketch() {
	done = 0
	document.getElementById("reset").style.visibility = "hidden";

	bars = new Array(floor(width / thickness));
	for (let i = 0; i < bars.length; i++) {
		bars[i] = random(height - 10);
		states[i] = -1;
	}
	startQSort()
}

function startQSort() {
	quickSort(bars, 0, bars.length - 1)
}


async function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}
	let index = await partition(arr, start, end);
	states[index] = -1;

	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);
}

async function partition(arr, start, end) {
	for (let i = start; i < end; i++) {
		states[i] = 1;
	}

	let pivot_val = arr[end];
	let pivot_ind = start;
	states[pivot_ind] = 0;
	for (let i = start; i < end; i++) {
		if (arr[i] < pivot_val) {
			await swap(arr, i, pivot_ind);
			states[pivot_ind] = -1;
			pivot_ind++;
			states[pivot_ind] = 0;
		}
	}
	await swap(arr, pivot_ind, end);

	for (let i = start; i < end; i++) {
		if (i != pivot_ind) {
			states[i] = -1;
		}
	}

	return pivot_ind;
}
// k = 0
function draw() {
	flag = 0;

	background('#1f1a25');
	reset = select('#reset')
	// k++;
	for (i = 0; i < bars.length; i++) {
		noStroke();
		if (states[i] == 0) {
			fill('#E9328a');
			flag = 1;
		} else if (states[i] == 1) {
			fill('#D6FF00');
			flag = 1;
		} else {
			fill(255);
		}
		rect(i * thickness, height - bars[i], thickness, bars[i]);
	}
	if (flag == 0) {
		// noLoop();
		done = 1
		document.getElementById("reset").style.visibility = "visible";
	}
}

async function swap(arr, a, b) {
	await sleep(1);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// todo 1: separate the loading screen of both the loaders
// todo 2: replace the base64 function of native figma plugin api loaders
// todo 3: make separate functions for each task


// use figma.ui.once for authentication check

interface Iframe { }

interface ISubmittedData {
  prompt: string;
  prompt_strength?: number;
  frame?: Iframe | Iframe[];
  num_outputs?: number;
}

const svgToDataURL = (fileContent) => {
  const bg = fileContent
    .replace('<svg', fileContent.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"')
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ');
  return `data:image/svg+xml,${bg}`;
};

function drawImageOnSelectedNode() {
 // draw image on selected node
}

function drawImageRandom() {
// draw Image near to the plugin
}

function drawImageHandler(arrayBuffer: ArrayBuffer, ) {
  // draw single or multiple image on canvas
  // check for selected nodes
  const selected_node: readonly SceneNode[] = figma.currentPage.selection;
  if (selected_node.length == 0) {
    // if one response
    // Handle image pasting position
    const imageData = new Uint8Array(arrayBuffer);
    let img = figma.createImage(imageData);
    let rect = figma.createRectangle();
    rect.resize(300, 300);
    rect.fills = [
      {
        imageHash: img.hash,
        scaleMode: 'FILL',
        scalingFactor: 0.5,
        type: 'IMAGE',
      },
    ];
    // if multiple response
    // handle multiple image pasting positions


  } else if (selected_node.length == 1) {
    // selected node length is 1
  } else {
    // selected node length is greater than zero
    // now if image is 1 then render one image in all the selected nodes
    

    // if images is greater than one then render 4 images in different nodes
  }
}

figma.on('run', async ({ parameters }: RunEvent) => {
  // -- authenticating user --
  // when the plugin is run from command palette
  // const user = await figma.clientStorage.getAsync('user');
  // if (user === undefined && parameters?.prompt.length > 0) {
  //   figma.closePlugin('You are not logged in to snappy');
  // }

  // when the tab button is click to run the plugin
  if (parameters?.prompt.length > 0) {
    figma.showUI(
      `<script>
        (async (event) => {
          try {
            const response = await fetch('https://snappysnappy.herokuapp.com/create', {
              method: 'POST',
              body: JSON.stringify({ data: { prompt: '${parameters.prompt}' }}),
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
              },
            });
        
            let data = await response.text();
        
            function base64ToArrayBuffer(base64) {
              var binary_string = atob(base64);
              var len = binary_string.length;
              var bytes = new Uint8Array(len);
              for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
              }
              return bytes.buffer;
            }

            const arrayBuffer = base64ToArrayBuffer(data);
            parent.postMessage({ pluginMessage: { type: 'prompt-from-searchBar', data: arrayBuffer } }, '*');
          } catch (err) {
            console.log('error - ', err);
          }
        })();        
        </script>`,
      { visible: false, width: 200, height: 200 }
    );
    return;
  }
  // when the plugin is clicked upon to show
  figma.showUI(__html__, { width: 320, height: 480, title: 'Snappy' });
  figma.ui.onmessage = (msg) => {
    switch (msg.type) {
      case 'login':
        authenticate();
        break;
      case 'prompt':
        break;
      case 'render-image':
        createImage(msg.data);
        break;
      case 'prompt-from-searchBar':
        quickImageGenerator(msg.data);
        break;
      case 'increase-height':
        figma.ui.resize(320, 620);
        break;
      case 'decrease-height':
        figma.ui.resize(320, 480);
        break;
      case 'lexica-image-url':
        lexicaImageRender(msg.data);
      default:
        break;
    }
  };
});

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'prompt-from-searchBar':
      quickImageGenerator(msg.data);
      break;
    default:
      break;
  }
};

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length === 1) {
    const node = figma.getNodeById(figma.currentPage.selection[0].id) as SceneNode;

    node.exportAsync({ format: 'SVG' }).then((bytes) => {
      figma.ui.postMessage({ type: 'selected_node_bytes_data', name: 'selected_node_bytes_data', data: bytes });
    });

    figma.ui.postMessage({
      type: 'selected_node',
      name: figma.currentPage.selection[0].name,
      data: {
        id: figma.currentPage.selection[0].id,
        type: figma.currentPage.selection[0].type,
      },
    });
  } else if (figma.currentPage.selection.length > 1) {
    figma.ui.postMessage({ name: 'Select one item', data: undefined, node: undefined });
  } else {
    figma.ui.postMessage({ name: 'No area selected', data: undefined, node: undefined });
  }
});

async function authenticate() {
  const token = await figma.clientStorage.getAsync('user');
  if (!token) {
    figma.ui.postMessage({ name: 'userNotAuthenticated' });
  }
}

async function quickImageGenerator(arrayBuffer: ArrayBuffer) {
  const numberOfNodesSelected = figma.currentPage.selection.length;
  if (numberOfNodesSelected === 1) {
    // append the image to the selected node
    const node = figma.currentPage.selection[0];
    const image = figma.createImage(new Uint8Array(arrayBuffer));
    // imageNode.resize(width, height);
    // imageNode.name = 'snappy';
    const newPaint = {
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: image.hash,
    };
    // if type of node = scene then return
    node.fills = [newPaint];
  } else if (numberOfNodesSelected === 0) {
    const frame = figma.createFrame();
    frame.name = 'snappy';
    frame.resize(200, 200);
    const imageWidth = 200;
    const imageData = new Uint8Array(arrayBuffer);
    let img = figma.createImage(imageData);
    let rect = figma.createRectangle();
    rect.resize(imageWidth, imageWidth);
    rect.fills = [
      {
        imageHash: img.hash,
        scaleMode: 'FILL',
        scalingFactor: 0.5,
        type: 'IMAGE',
      },
    ];
    frame.appendChild(rect);
    frame.layoutAlign = 'STRETCH';
    frame.layoutGrow = 1;
    frame.layoutMode = 'HORIZONTAL';
  } else if (numberOfNodesSelected > 1) {
    figma.currentPage.selection.forEach((node) => {
      const image = figma.createImage(new Uint8Array(arrayBuffer));
      const newPaint = {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: image.hash,
      };
      // if type of node = scene then return
      node.fills = [newPaint];
    });
  }
  figma.closePlugin();
}

function createImage(arrayBuffer: ArrayBuffer) {
  const numberOfNodesSelected = figma.currentPage.selection.length;
  if (numberOfNodesSelected === 1) {
    // append the image to the selected node
    const node = figma.currentPage.selection[0];
    const image = figma.createImage(new Uint8Array(arrayBuffer));
    // imageNode.resize(width, height);
    // imageNode.name = 'snappy';
    const newPaint = {
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: image.hash,
    };
    // if type of node = scene then return
    node.fills = [newPaint];
    return;
  } else if (numberOfNodesSelected === 0) {
    const imageWidth = 200;
    const imageData = new Uint8Array(arrayBuffer);
    let img = figma.createImage(imageData);
    let rect = figma.createRectangle();
    rect.resize(imageWidth, imageWidth);
    rect.fills = [
      {
        imageHash: img.hash,
        scaleMode: 'FILL',
        scalingFactor: 0.5,
        type: 'IMAGE',
      },
    ];
  } else if (numberOfNodesSelected > 1) {
    figma.currentPage.selection.forEach((node) => {
      const image = figma.createImage(new Uint8Array(arrayBuffer));
      // imageNode.resize(width, height);
      // imageNode.name = 'snappy';
      const newPaint = {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: image.hash,
      };
      // if type of node = scene then return
      node.fills = [newPaint];
    });
  }
}

function lexicaImageRender(arrayBuffer: Uint8Array) {
  const numberOfNodesSelected = figma.currentPage.selection.length;

  if (numberOfNodesSelected > 1) {
    figma.currentPage.selection.forEach((node) => {
      const image = figma.createImage(new Uint8Array(arrayBuffer));
      const newPaint = {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: image.hash,
      };
      node.fills = [newPaint];
    });
    return;
  }

  const imageWidth = 200;
  const imageData = arrayBuffer;
  let img = figma.createImage(imageData);
  let rect = figma.createRectangle();
  rect.resize(imageWidth, imageWidth);
  rect.fills = [
    {
      imageHash: img.hash,
      scaleMode: 'FILL',
      scalingFactor: 0.5,
      type: 'IMAGE',
    },
  ];
}

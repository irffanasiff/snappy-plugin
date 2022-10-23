import { ISubmittedData } from '../../typings/Definitions';
// todo 1: separate the loading screen of both the loaders ( LFG )
// todo 2: replace the base64 function of native figma plugin api loaders
// todo 3: make separate functions for each task

figma.on('run', async ({ parameters }: RunEvent) => {
  // await figma.clientStorage.deleteAsync('user');
  const user_token = await figma.clientStorage.getAsync('user_token');
  const user_id = await figma.clientStorage.getAsync('user_id');
  console.log('user from storage - ', user_token);

  if (parameters?.prompt.length > 0) {
    if (user_token === undefined) {
      figma.closePlugin('You are not logged in to snappy');
    }
    figma.showUI(
      `<script>
        (async (event) => {
          try {
            const response = await fetch('https://snappysnappy.herokuapp.com/create/${user_id}', {
              method: 'POST',
              body: JSON.stringify({ data: { prompt: '${parameters.prompt}' }}),
              headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ${user_token}'
              },
            });
            console.log('response - ', response);
            let base64Img = await response.text();

            parent.postMessage({ pluginMessage: { type: 'prompt-from-searchBar', data: base64Img } }, '*');
          } catch (err) {
            console.log(err);
            parent.postMessage({ pluginMessage: { type: 'error', data: err.message } }, '*');
          }
        })();        
        </script>`,
      { visible: false, width: 200, height: 200 }
    );
    return;
  }

  figma.showUI(__html__, { width: 340, height: 490, title: 'Snappy' });

  if (user_token === undefined) {
    figma.ui.postMessage({ type: 'authentication', name: 'user not authenticated', data: undefined });
  } else {
    figma.ui.postMessage({
      type: 'authentication',
      name: 'user  authenticated',
      data: { token: user_token, _id: user_id },
    });
  }

  figma.ui.onmessage = (msg) => {
    switch (msg.type) {
      case 'login':
        console.log('inside controller login called');
        authenticate(msg.data);
        break;
      case 'logout':
        userLogout();
        break;
      case 'render-image':
        console.log('message data - ', msg.data);
        pluginImageGenerate(msg.data);
        break;
      case 'prompt-from-searchBar':
        quickImageGenerator(msg.data);
        break;
      case 'increase-height':
        figma.ui.resize(340, 620);
        break;
      case 'decrease-height':
        figma.ui.resize(340, 490);
        break;
      case 'lexica-image-url':
        drawImageHandler(new Uint8Array(msg.data));
        break;
      case 'error':
        console.log('there was an error 🇨🇭 - ', msg.data);
        break;
      default:
        break;
    }
  };
});

function drawImageOnSelectedNode(arrayBuffer: Uint8Array, node: SceneNode) {
  // draw image on selected node
  const image = figma.createImage(arrayBuffer);
  const newPaint = {
    type: 'IMAGE',
    scaleMode: 'FILL',
    imageHash: image.hash,
  };
  // @ts-ignore
  if (hasFillsProperty(node)) {
    // @ts-ignore
    node.fills = [newPaint];
  } else {
    figma.notify('Can not draw Image on selected node');
  }
}

function drawImageHandler(imageArray: Uint8Array) {
  const selected_node: readonly SceneNode[] = figma.currentPage.selection;
  if (selected_node.length == 0) {
    console.log('selected node length is 0');
    drawImageInCenterOfViewPort(imageArray);
  } else if (selected_node.length == 1) {
    drawImageOnSelectedNode(imageArray, selected_node[0]);
  } else {
    selected_node.forEach((node) => {
      drawImageOnSelectedNode(imageArray, node);
    });
  }
}
function drawImageInCenterOfViewPort(arrayBuffer: Uint8Array) {
  const imageData = arrayBuffer;
  let img = figma.createImage(imageData);
  let rect = figma.createRectangle();
  let zoomLevel = figma.viewport.zoom;
  rect.x = figma.viewport.center.x;
  rect.y = figma.viewport.center.y;
  rect.resize(300 * (1 / zoomLevel), 300 * (1 / zoomLevel));
  console.log('pasting image');
  rect.fills = [
    {
      imageHash: img.hash,
      scaleMode: 'FILL',
      scalingFactor: 0.5,
      type: 'IMAGE',
    },
  ];
}

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
  if (figma.currentPage.selection.length === 0) {
    console.log('no node selected');
    figma.ui.postMessage({ type: 'selected_node_bytes_data', name: 'selected_node_bytes_data', data: undefined });
    figma.ui.postMessage({
      type: 'selected_node',
      name: 'Select an area',
      data: {
        id: undefined,
        type: undefined,
      },
    });
  } else if (figma.currentPage.selection.length === 1) {
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
    figma.ui.postMessage({ type: 'selected_node', name: 'Multiple areas selected', data: undefined, node: undefined });
  } else {
    figma.ui.postMessage({ type: 'selected_node', name: 'No area selected', data: undefined, node: undefined });
  }
});

async function authenticate(loginData: { token: any; _id: any }) {
  console.log('storing user in storage - ', loginData);
  await figma.clientStorage.setAsync('user_token', `${loginData.token}`);
  await figma.clientStorage.setAsync('user_id', `${loginData._id}`);
  console.log('user stored in storage');
}
async function userLogout() {
  await figma.clientStorage.deleteAsync('user_id');
  await figma.clientStorage.deleteAsync('user_token');
  console.log('user logged out');
}

async function quickImageGenerator(arrayBuffer: string) {
  const imageArray = figma.base64Decode(arrayBuffer);
  drawImageHandler(imageArray);
  figma.closePlugin();
}

function pluginImageGenerate(arrayBuffer: ArrayBuffer) {
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
    if (hasFillsProperty(node)) {
      // @ts-ignore
      node.fills = [newPaint];
    } else {
      figma.notify('Can not draw Image on selected node');
    }
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
      if (hasFillsProperty(node)) {
        // @ts-ignore
        node.fills = [newPaint];
      } else {
        figma.notify('Can not draw Image on selected node');
      }
    });
  }
}

function hasFillsProperty(node: SceneNode): node is FrameNode | GroupNode {
  return (
    node.type === 'ELLIPSE' ||
    node.type === 'RECTANGLE' ||
    node.type === 'VECTOR' ||
    node.type === 'STAR' ||
    node.type === 'POLYGON' ||
    node.type === 'LINE' ||
    node.type === 'TEXT'
  );
}

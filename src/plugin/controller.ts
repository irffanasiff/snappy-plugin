figma.on('run', async ({ parameters }: RunEvent) => {
  const user = await figma.clientStorage.getAsync('user');
  // if (user === undefined) {
  //   figma.closePlugin('You are not logged in to snappy');
  // }

  if (parameters.prompt.length > 0) {
    console.log('prompt entered - ', parameters.prompt);
    figma.closePlugin(parameters.prompt);
  }
});

figma.on('selectionchange', () => {
  console.log('selection changed');
  if (figma.currentPage.selection.length === 1) {
    figma.ui.postMessage({
      name: figma.currentPage.selection[0].name,
      data: { id: figma.currentPage.selection[0].id, type: figma.currentPage.selection[0].type },
    });
  } else if (figma.currentPage.selection.length > 1) {
    figma.ui.postMessage({ name: 'Select one item only', data: undefined });
  } else {
    figma.ui.postMessage({ name: 'Nothing is selected', data: undefined });
  }
});

async function startUI() {
  figma.showUI(__html__, { width: 320, height: 480 });
  figma.ui.onmessage = (msg) => {
    switch (msg.type) {
      case 'form-submitted':
        formSubmitted(msg.data);
        break;
      case 'login':
        authenticate();
        break;
      case 'prompt':
        console.log('prompt entered - ', msg.data);
        break;
      default:
        break;
    }
  };
}

function formSubmitted(data: { prompt: string }) {
  console.log('form submitted', data);
  if (figma.currentPage.selection.length > 0) {
    const currentSelection = figma.currentPage.selection[0];
    console.log('1 current selection ', currentSelection.name);
    let frame = figma.createFrame();
    let vector = figma.createVector();
    let viewport = figma.viewport.center;

    let image = data.prompt;

    frame.fills = [
      {
        type: 'SOLID',
        color: {
          r: 1,
          g: 1,
          b: 1,
        },
      },
    ];

    frame.name = image;
  }
}

function authenticate() {
  const token = figma.clientStorage.getAsync('token');
  if (!token) {
    figma.ui.postMessage({ type: 'userNotAuthenticated' });
  }
  figma.ui.postMessage({ type: 'userAuthenticated', origin });
}
startUI();

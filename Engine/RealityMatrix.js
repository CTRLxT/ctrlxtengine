// Engine/RealityMatrix.js
/**
 * RealityMatrix.js
 * ------------------
 * Manages the game world as a dynamic "reality matrix" within the
 * CtrlXTEngine.  This module handles world creation, alteration,
 * and temporal control, drawing inspiration from quantum physics
 * and the concepts outlined in the project's documentation.
 */

// Global variables to hold the two worlds
let developerWorld;
let playerWorld;

/**
 * Initializes the Quantum Reality Matrix (the game world).
 *
 * @param {object} dimensions - The dimensions of the game world (e.g., { x: 100, y: 100, z: 100 }).
 * @param {string} ocularComposition - The composition of the Q-OPU (e.g., "CosmicDustEntanglement").
 * @param {string} processingModel - The processing model used (e.g., "BioQuantumEntangled").
 * @param {string[]} dataSources - An array of data sources for the Q-OPU.
 */
function createWorld(dimensions, ocularComposition, processingModel, dataSources) {
  const baseWorld = { //remove isDeveloper
    dimensions: dimensions,
    ocularComposition: ocularComposition,
    processingModel: processingModel,
    objects: [],
    timeState: "PLAY",
    timeSpeedMultiplier: 1,
    dataSources: dataSources,
    zeroPoint: {
      frequency: 0,
      coordinates: { x: 0, y: 0, z: 0 },
    },
  };
  return baseWorld;
}

/**
 * Applies changes to the Quantum Reality Matrix (the game world).
 *
 * @param {object} targetWorld - The world object to modify (developerWorld or playerWorld).
 * @param {object[]} changes - An array of change objects, each describing a modification.
 */
function alterReality(targetWorld, changes) {
  console.log(`Q-OPU: Altering Quantum Reality Matrix: ${targetWorld === developerWorld ? "Developer World" : "Player World"}`);
  for (const change of changes) {
    console.log(`Q-OPU: Applying change: ${JSON.stringify(change)}`);

    switch (change.type) {
      case "add":
        if (!change.object || !change.object.id) {
          console.error("Q-OPU: Error - 'add' change requires a valid object with an 'id'");
          break;
        }
        // Check for duplicates before adding
        const existingObject = targetWorld.objects.find(obj => obj.id === change.object.id);
        if (existingObject) {
          console.warn(`Q-OPU: Warning - Object with id '${change.object.id}' already exists in this world.  Skipping addition.`);
          break; // Exit the 'add' case, don't add the duplicate
        }
        targetWorld.objects.push(change.object);
        break;
      case "remove":
        if (!change.targetId) {
          console.error("Q-OPU: Error - 'remove' change requires a 'targetId'");
          break;
        }
        targetWorld.objects = targetWorld.objects.filter(obj => obj.id !== change.targetId);
        break;
      case "modify":
        if (!change.targetId || !change.properties) {
          console.error("Q-OPU: Error - 'modify' change requires 'targetId' and 'properties'");
          break;
        }
        const targetObject = targetWorld.objects.find(obj => obj.id === change.targetId);
        if (targetObject) {
          Object.assign(targetObject, change.properties);
        } else {
          console.warn(`Q-OPU: Warning - Object with id '${change.targetId}' not found for modification`);
        }
        break;
      case "createBlinkSpot": // Added for teleportation
        if (!change.coordinates) {
          console.error("Q-OPU: Error - 'createBlinkSpot' requires 'coordinates'");
          break;
        }
        const newBlinkSpot = {
          id: `blinkSpot-${targetWorld.blinkSpots ? targetWorld.blinkSpots.length : 0}`,
          coordinates: change.coordinates,
          time: targetWorld.timeState,
        };

        if (!targetWorld.blinkSpots) {
          targetWorld.blinkSpots = [];
        }
        targetWorld.blinkSpots.push(newBlinkSpot);
        console.log(`Q-OPU: Created Blink Spot ${newBlinkSpot.id} at (${change.coordinates.x}, ${change.coordinates.y}, ${change.coordinates.z})`);
        break;
      default:
        console.error(`Q-OPU: Error - Unknown change type: ${change.type}`);
    }
  }
}

/**
 * Controls the flow of time within the Quantum Reality Matrix.
 *
 * @param {object} world - The game world object.
 * @param {string} state - The desired time state ("PLAY", "PAUSE", "STOP", "FAST FORWARD", "REWIND").
 * @param {number} [speed=1] - The speed multiplier for FAST FORWARD and REWIND (optional).
 */
function controlTime(world, state, speed = 1) {
  let previousState = world.timeState;
  if (["PLAY", "PAUSE", "STOP", "FAST FORWARD", "REWIND"].includes(state)) {
    world.timeState = state;
    world.timeSpeedMultiplier = (state === "FAST FORWARD" || state === "REWIND") ? speed : 1;
    console.log(`Q-OPU: Temporal State set to: ${state} with speed: ${world.timeSpeedMultiplier}`);

    switch (state) {
      case "PLAY":
        // Resume normal time flow
        break;
      case "PAUSE":
        // Stop all dynamic processes
        break;
      case "STOP":
        // Reset time to a beginning state (if applicable) -  implementation specific to game
        break;
      case "FAST FORWARD":
        if (speed <= 0) {
          console.error("Q-OPU: Speed for FAST FORWARD must be > 0.  Reverting to PLAY.");
          world.timeState = "PLAY";
          world.timeSpeedMultiplier = 1;
        }
        break;
      case "REWIND":
        if (speed <= 0) {
          console.error("Q-OPU: Speed for REWIND must be > 0.  Reverting to PLAY.");
          world.timeState = "PLAY";
          world.timeSpeedMultiplier = 1;
        }
        break;
    }
  } else {
    console.error(`Q-OPU: Error - Invalid time state: ${state}.  Must be PLAY, PAUSE, STOP, FAST FORWARD, or REWIND.`);
    world.timeState = previousState;
    world.timeSpeedMultiplier = 1;
  }
}

/**
 * Saves the current state of the Quantum Reality Matrix.
 *
 * @param {object} world - The game world object to save.
 * @returns {string} - A string representation of the saved state.
 */
function saveWorld(world) {
  console.log("Q-OPU: Saving Quantum Reality Matrix state...");
  const savedState = JSON.stringify(world);
  //  Add code here to actually save the state to a file or database
  return savedState;
}

/**
 * Loads a previously saved state of the Quantum Reality Matrix.
 *
 * @param {string} savedState - A string representation of the saved state.
 * @returns {object} - The loaded game world object.
 */
function loadWorld(savedState) {
  console.log("Q-OPU: Loading Quantum Reality Matrix state...");
  try {
    const loadedWorld = JSON.parse(savedState);
    return loadedWorld;
  } catch (error) {
    console.error("Q-OPU: ERROR! Invalid saved state.  Returning a new world.");
    return createWorld({ x: 10, y: 10, z: 10 }, "default", "default", []);
  }
}

// Example Usage (for testing within this file)
const ocularComposition = "CosmicDustEntanglement";
const processingModel = "BioQuantumEntangled";
const dataSources = ["QuantumGPS", "QuantumDeviceMetrics"];

// Initialize the worlds
developerWorld = createWorld({ x: 100, y: 100, z: 100 }, ocularComposition, processingModel, dataSources);
playerWorld = createWorld({ x: 100, y: 100, z: 100 }, ocularComposition, processingModel, dataSources);


const changeAddDev = { type: "add", object: { id: "devObj1", position: { x: 5, y: 5 }, color: "blue" } };
const changeRemoveDev = { type: "remove", targetId: "devObj1" };
const changeModifyDev = { type: "modify", targetId: "devObj1", properties: { color: "red", size: 10 } };
const changeBlinkSpotDev = { type: "createBlinkSpot", coordinates: { x: 20, y: 30, z: 0 } };

const changeAddPlayer = { type: "add", object: { id: "playerObj1", position: { x: 10, y: 10 }, color: "green" } };
const changeRemovePlayer = { type: "remove", targetId: "playerObj1" }; //remove this line.  Players should not be able to remove.


// Apply changes to the worlds
alterReality(developerWorld, [changeAddDev, changeRemoveDev, changeModifyDev, changeBlinkSpotDev]);
alterReality(playerWorld, [changeAddPlayer]); // Players can only add.

controlTime(developerWorld, "PAUSE");
controlTime(playerWorld, "PLAY");

console.log("Developer World: ", developerWorld);
console.log("Player World: ", playerWorld);

const savedDevWorld = saveWorld(developerWorld);
const loadedDevWorld = loadWorld(savedDevWorld);
console.log("Loaded Developer World: ", loadedDevWorld);

const savedPlayerWorld = saveWorld(playerWorld);
const loadedPlayerWorld = loadWorld(savedPlayerWorld);
console.log("Loaded Player World: ", loadedPlayerWorld);


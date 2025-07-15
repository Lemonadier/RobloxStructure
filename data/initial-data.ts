import { ScriptData } from '../types';

export const initialScriptData: ScriptData = {
    // --- Server-Side Scripts ---
    'PlayerDataService': {
        id: 'PlayerDataService',
        description: 'จัดการการบันทึกและโหลดข้อมูลผู้เล่น (เช่น เงิน, คลังเก็บของ, พืชที่กำลังเติบโต, พืชที่เก็บเกี่ยวแล้ว)', type: 'Server', location: 'ServerScriptService',
        details: { 'อ่านจาก (Reads from)': ['PlantData', 'ItemData'], 'เขียนถึง (Writes to)': ['DataStoreService', 'Workspace_Plants'], 'สื่อสารกับ (Communicates with)': ['GrowthAnimationService', 'PlantingService', 'CollectionService'], },
        connections: ['PlantData', 'ItemData', 'DataStoreService', 'Workspace_Plants', 'GrowthAnimationService', 'PlantingService', 'CollectionService'],
        notes: 'กำหนด DataStore เวอร์ชัน (PlayerData_VXX_...) และต้องเคลียร์ข้อมูลเก่าเมื่อเปลี่ยนเวอร์ชัน'
    },
    'PlantingService': {
        id: 'PlantingService',
        description: 'จัดการตรรกะการปลูกพืช, การลดจำนวนเมล็ดพันธุ์, การสร้างโมเดลพืชใหม่ในโลก และการจัดการการถอนพืช', type: 'Server', location: 'ServerScriptService',
        details: { 'อ่านจาก (Reads from)': ['PlantData', 'ItemData'], 'เขียนถึง (Writes to)': ['Workspace_Plants', 'GrowthAnimationService'], 'สื่อสารกับ (Communicates with)': ['PlayerActionController (via RemoteEvents)', 'MessageService_Client (via RemoteEvents)', 'Players'], },
        connections: ['PlantData', 'ItemData', 'Workspace_Plants', 'GrowthAnimationService', 'PlayerActionController', 'MessageService_Client', 'Players', 'RemoteEvents'],
        notes: 'มี Heartbeat loop ที่อัปเดต TotalGrowthTimeSpent และ GrowthProgress ของพืชเมื่อมีผู้เล่นอยู่ในเซิร์ฟเวอร์'
    },
    'CollectionService': {
        id: 'CollectionService',
        description: 'จัดการตรรกะการเก็บเกี่ยวพืชผลที่โตเต็มที่ และเพิ่มพืชที่เก็บเกี่ยวแล้วเข้าสู่คลังเก็บของของผู้เล่น', type: 'Server', location: 'ServerScriptService',
        details: { 'อ่านจาก (Reads from)': ['PlantData'], 'เขียนถึง (Writes to)': ['PlayerInventory'], 'สื่อสารกับ (Communicates with)': ['PlayerActionController (via RemoteEvents)', 'MessageService_Client (via RemoteEvents)'], },
        connections: ['PlantData', 'PlayerInventory', 'PlayerActionController', 'MessageService_Client', 'RemoteEvents'],
        notes: ''
    },
    'GrowthAnimationService': {
        id: 'GrowthAnimationService',
        description: 'เป็นสคริปต์ที่ถูกโคลนเข้าไปในโมเดลพืชแต่ละต้น และรับผิดชอบ เฉพาะ การเล่นแอนิเมชันการเติบโตของโมเดลพืชนั้นๆ', type: 'Server', location: 'ServerScriptService (as a template)',
        details: { 'อ่านจาก (Reads from)': ['PlantData', 'PlantAttributes'], 'เขียนถึง (Writes to)': ['PlantModelProperties (Scale, Transparency)'], 'สื่อสารกับ (Communicates with)': ['TweenService'], },
        connections: ['PlantData', 'TweenService', 'PlantingService', 'PlayerDataService'],
        notes: 'ทำงานเมื่อ script.Enabled เป็น true (ถูกเปิดใช้งานโดย PlantingService หรือ PlayerDataService)'
    },
    'PlantInteractionSetup': {
        id: 'PlantInteractionSetup',
        description: 'ตรวจสอบให้แน่ใจว่าทุกส่วนของโมเดลพืชที่อยู่ใน Workspace.Plants สามารถโต้ตอบกับเมาส์ได้ (ตั้งค่า CanQuery = true, Locked = false)', type: 'Server', location: 'ServerScriptService',
        details: { 'อ่านจาก (Reads from)': ['Workspace_Plants'], 'เขียนถึง (Writes to)': ['PlantModelProperties (BasePart)'], },
        connections: ['Workspace_Plants'],
        notes: ''
    },
    'AdminItemCommands': {
        id: 'AdminItemCommands',
        description: 'อนุญาตให้ผู้เล่นที่เป็นแอดมินเพิ่มไอเท็ม (เมล็ดพันธุ์, เครื่องมือ, พืชที่เก็บเกี่ยว) ให้กับผู้เล่นอื่นผ่านคำสั่งแชท', type: 'Server', location: 'ServerScriptService',
        details: { 'อ่านจาก (Reads from)': ['ItemData', 'PlantData'], 'เขียนถึง (Writes to)': ['PlayerInventory'], 'สื่อสารกับ (Communicates with)': ['Players (Chatted event)', 'MessageService_Client (via RemoteEvents)'], },
        connections: ['ItemData', 'PlantData', 'PlayerInventory', 'Players', 'Chat', 'MessageService_Client', 'RemoteEvents'],
        notes: ''
    },
    'TeleportService': {
        id: 'TeleportService',
        description: 'จัดการการวาร์ปผู้เล่นไปยังเกาะต่างๆ', type: 'Server', location: 'ServerScriptService',
        details: { 'สื่อสารกับ (Communicates with)': ['PlayerActionController (via RemoteEvents)'], },
        connections: ['PlayerActionController', 'RemoteEvents'],
        notes: 'Handles CycleTeleportDestinationEvent and ExecuteTeleportEvent'
    },
    // --- Client-Side Scripts ---
    'ClientManager': {
        id: 'ClientManager',
        description: 'เป็นสคริปต์หลักที่เริ่มต้นการทำงานของสคริปต์ฝั่งไคลเอนต์อื่นๆ ทั้งหมด', type: 'Client', location: 'StarterPlayerScripts',
        details: { 'อ่านจาก (Reads from)': ['StarterPlayerScripts.ModuleScripts'], },
        connections: ['InventoryClient', 'PlantHoverInfo', 'PlayerActionController', 'ToolModeUI', 'MessageService_Client'],
        notes: 'Initializes all other client-side modules.'
    },
    'InventoryClient': {
        id: 'InventoryClient',
        description: 'จัดการ UI ของคลังเก็บของ (เปิด/ปิด, แสดงไอเท็ม, แท็บ) และอนุญาตให้ผู้เล่นเลือกเมล็ดพันธุ์/เครื่องมือ', type: 'Client', location: 'StarterPlayerScripts.ModuleScripts',
        details: { 'อ่านจาก (Reads from)': ['ItemData', 'PlantData', 'PlayerInventory'], 'เขียนถึง (Writes to)': ['InventoryUI'], 'สื่อสารกับ (Communicates with)': ['ToolManager', 'MessageService_Client', 'UserInputService'], },
        connections: ['ItemData', 'PlantData', 'PlayerInventory', 'ToolManager', 'MessageService_Client', 'UserInputService'],
        notes: ''
    },
    'PlantHoverInfo': {
        id: 'PlantHoverInfo',
        description: 'แสดงข้อมูลพืชแบบลอยตัวเมื่อผู้เล่นนำเมาส์ไปชี้ และอนุญาตให้ปักหมุดข้อมูลพืชที่โตเต็มที่หรือกำลังเติบโตได้โดยใช้ปุ่ม F', type: 'Client', location: 'StarterPlayerScripts.ModuleScripts',
        details: { 'อ่านจาก (Reads from)': ['PlantData', 'PlantAttributes', 'ToolManager', 'UserInputService'], 'เขียนถึง (Writes to)': ['BillboardGui', 'Highlight'], },
        connections: ['PlantData', 'ToolManager', 'UserInputService'],
        notes: 'Uses mouse position and F key for pinning.'
    },
    'PlayerActionController': {
        id: 'PlayerActionController',
        description: 'จัดการอินพุตของผู้เล่นสำหรับการกระทำต่างๆ เช่น การปลูก, การเก็บเกี่ยว, การถอน และการวาร์ป', type: 'Client', location: 'StarterPlayerScripts.ModuleScripts',
        details: { 'อ่านจาก (Reads from)': ['ToolManager', 'UserInputService'], 'เขียนถึง (Writes to)': ['ProgressBarGui'], 'สื่อสารกับ (Communicates with)': ['PlantingService (via RemoteEvents)', 'CollectionService (via RemoteEvents)', 'TeleportService (via RemoteEvents)', 'MessageService_Client'], },
        connections: ['ToolManager', 'UserInputService', 'PlantingService', 'CollectionService', 'TeleportService', 'MessageService_Client', 'RemoteEvents'],
        notes: 'Uses mouse clicks and Z, X, C keys. Can handle rapid clicks or hold-to-sweep actions.'
    },
    'ToolModeUI': {
        id: 'ToolModeUI',
        description: 'จัดการ UI สำหรับการเลือกเครื่องมือ (Plant, Harvest, Shovel) และการเปลี่ยนเครื่องมือด้วยปุ่ม 1, 2, 3', type: 'Client', location: 'StarterPlayerScripts.ModuleScripts',
        details: { 'อ่านจาก (Reads from)': ['ToolManager', 'PlayerInventory'], 'เขียนถึง (Writes to)': ['ToolUI'], 'สื่อสารกับ (Communicates with)': ['ToolManager'], },
        connections: ['ToolManager', 'PlayerInventory'],
        notes: ''
    },
    'MessageService_Client': {
        id: 'MessageService_Client',
        description: 'แสดงข้อความแจ้งเตือนสั้นๆ บนหน้าจอของผู้เล่น (เช่น "Plant Grown!", "Not enough seeds.")', type: 'Client', location: 'StarterPlayerScripts.ModuleScripts',
        details: { 'อ่านจาก (Reads from)': ['RemoteEvents (ShowMessageEvent)'], 'เขียนถึง (Writes to)': ['MessageUI'], },
        connections: ['RemoteEvents', 'ClientManager', 'InventoryClient', 'PlayerActionController', 'PlantingService', 'CollectionService', 'AdminItemCommands'],
        notes: 'This is the client-side receiver for messages.'
    },
    // --- Shared Resources ---
    'RemoteEvents': { id: 'RemoteEvents', description: 'เป็นตัวกลางสื่อสารระหว่าง Client และ Server สำหรับเหตุการณ์ต่างๆ', type: 'Shared', location: 'ReplicatedStorage', details: { 'Events': ['PlantEvent', 'RemovePlantEvent', 'CollectPlantEvent', 'CycleTeleportDestinationEvent', 'ExecuteTeleportEvent', 'ShowMessageEvent'] }, connections: [ 'PlantingService', 'CollectionService', 'PlayerActionController', 'MessageService_Client', 'AdminItemCommands', 'TeleportService' ], notes: 'Core communication bridge.' },
    'ItemData': { id: 'ItemData', description: 'ฐานข้อมูลสำหรับไอเท็มและเครื่องมือทั้งหมดในเกม (เช่น ชื่อ, คำอธิบาย, IconId)', type: 'Shared', location: 'ReplicatedStorage', details: {}, connections: ['PlayerDataService', 'PlantingService', 'AdminItemCommands', 'InventoryClient'], notes: 'A module script acting as a database.' },
    'PlantData': {
        id: 'PlantData',
        description: 'ฐานข้อมูลสำหรับพืชผลทั้งหมดในเกม (เช่น ชื่อ, ราคา, เวลาเติบโต, โมเดล, IconId)', type: 'Shared', location: 'ReplicatedStorage', details: {}, connections: ['PlayerDataService', 'PlantingService', 'CollectionService', 'GrowthAnimationService', 'AdminItemCommands', 'InventoryClient', 'PlantHoverInfo'], notes: 'A module script acting as a database.',
        data: { "Wheat": { "Price": 10, "SellMultiply": 1.1, "GrowthTime": 30 }, "Carrot": { "Price": 15, "SellMultiply": 1.2, "GrowthTime": 90 }, "Potato": { "Price": 20, "SellMultiply": 1.25, "GrowthTime": 120 }, "Tomato": { "Price": 50, "SellMultiply": 1.3, "GrowthTime": 150 }, "Corn": { "Price": 120, "SellMultiply": 1.35, "GrowthTime": 180 }, "Strawberry": { "Price": 200, "SellMultiply": 1.4, "GrowthTime": 210 }, "Blueberry": { "Price": 300, "SellMultiply": 1.8, "GrowthTime": 240 }, "Pumpkin": { "Price": 350, "SellMultiply": 2, "GrowthTime": 300 }, "Watermelon": { "Price": 400, "SellMultiply": 2.2, "GrowthTime": 360 }, "Cabbage": { "Price": 500, "SellMultiply": 2.5, "GrowthTime": 270 }, "GalaxyPear": { "Price": 1200, "SellMultiply": 5, "GrowthTime": 600 }, "BlackHole_Tile": { "Price": 2500, "SellMultiply": 12, "GrowthTime": 1200 }, "Chronos_Apple": { "Price": 12000, "SellMultiply": 25, "GrowthTime": 2800 }, "Oak_Tree": { "Price": 800, "SellMultiply": 3.0, "GrowthTime": 1800 } }
    },
    'ToolManager': { id: 'ToolManager', description: 'จัดการสถานะของเครื่องมือที่ผู้เล่นกำลังใช้งานอยู่ (ActiveTool)', type: 'Shared', location: 'ReplicatedStorage', details: {}, connections: ['InventoryClient', 'PlantHoverInfo', 'PlayerActionController', 'ToolModeUI'], notes: 'A module script for state management.' },
    // --- Roblox Services / Game Objects ---
    'DataStoreService': { id: 'DataStoreService', type: 'Service', description: 'บริการของ Roblox สำหรับการบันทึกข้อมูลถาวร', connections: ['PlayerDataService'] },
    'Workspace_Plants': { id: 'Workspace_Plants', type: 'Service', description: 'คอนเทนเนอร์ใน Workspace สำหรับเก็บโมเดลพืชทั้งหมด', connections: ['PlayerDataService', 'PlantingService', 'PlantInteractionSetup'] },
    'Players': { id: 'Players', type: 'Service', description: 'บริการของ Roblox สำหรับจัดการผู้เล่นในเซิร์ฟเวอร์', connections: ['PlantingService', 'AdminItemCommands'] },
    'TweenService': { id: 'TweenService', type: 'Service', description: 'บริการของ Roblox สำหรับสร้างแอนิเมชันที่ราบรื่น (tweens)', connections: ['GrowthAnimationService'] },
    'UserInputService': { id: 'UserInputService', type: 'Service', description: 'บริการของ Roblox สำหรับจัดการอินพุตจากผู้ใช้ (เมาส์, คีย์บอร์ด)', connections: ['InventoryClient', 'PlantHoverInfo', 'PlayerActionController'] },
    'PlayerInventory': { id: 'PlayerInventory', type: 'Service', description: 'ข้อมูลคลังเก็บของของผู้เล่น (Player.Backpack, Player.Data)', connections: ['InventoryClient', 'CollectionService', 'AdminItemCommands', 'ToolModeUI'] },
    'Chat': { id: 'Chat', type: 'Service', description: 'ระบบแชทของ Roblox, ใช้สำหรับรับคำสั่งแอดมิน', connections: ['AdminItemCommands'] },
};

import _ from "lodash";

import DatabaseInterface from "./database-interface";

import Robot from "../entity/robot";
import Device from "../entity/device";

export default class Mongodb implements DatabaseInterface {
  db: any;

  // Initialize db (session)
  constructor(db: any) {
    this.db = db
  }

  getAllRobots(): Promise<Array<Robot>> {
    return this.db.collections.robots.find().toArray()
  }

  getAllDevices(): Promise<Array<Device>> {
    return this.db.collections.devices.find().toArray()
  }

  findRobotByUuid(uuid: string): Promise<Robot> {
    return this.db.collections.robots.findOne({uuid: uuid})
  }

  saveRobot(robot: Robot): Promise<boolean> {
    return this.db.collections.robots.insertOne(robot).then(robot => {
      return true
    }).catch(err => {
      return false
    })
  }

  removeRobot(socketId: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }

  saveDevice(device): Promise<boolean> {
    return this.db.collections.devices.insertOne(device).then(res => {
      return new Promise(resolve => resolve(true))
    })
  }

  getAllDevicesByRobotUuid(uuid: string): Promise<Array<Device>> {
    return this.db.collections.devicesrobots.find({robotUuid: uuid})
  }

  // TODO: Confirm if this method really work correctly
  updateRobotRosnodes(uuid: string, rosnodes: Array<string>): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("../models/user.model");
const Brand = require("../models/brand.model");
const Client = require("../models/client.model");
const Order_Item = require("../models/order_item.model");
const Order = require("../models/order.model");
const Part = require("../models/part.model");
const Provider = require("../models/provider.model");
const Storage = require("../models/storage.model");

const connection = new Sequelize(dbConfig);

User.init(connection);
Brand.init(connection);
Client.init(connection);
Order_Item.init(connection);
Order.init(connection);
Part.init(connection);
Provider.init(connection);
Storage.init(connection);

Brand.associate(connection.models);
Client.associate(connection.models);
Order.associate(connection.models);
Part.associate(connection.models);
Provider.associate(connection.models);
Storage.associate(connection.models);

module.exports = connection;

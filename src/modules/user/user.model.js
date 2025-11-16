const path = require("path");
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize.js'))
const UserType = require('./user-type.model')
const { DataTypes }   = require("sequelize");
const bcrypt = require('bcryptjs')

const User = sequelize.define("users", {
      first_name: { 
            type: DataTypes.STRING(255),
      },
      last_name: { 
            type: DataTypes.STRING(255),
      },
      username: { 
            type: DataTypes.STRING(255),
            allowNull: false, 
      },
      email: { 
            type: DataTypes.STRING,
            allowNull: false,
       },
      password: { 
            allowNull: false,
            type: DataTypes.STRING,
            set(value) {
                  this.setDataValue("password", bcrypt.hashSync(value, 8))
            }
       },
      user_type_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
       },
      is_active: { 
            type: DataTypes.ENUM,
            values: [0, 1]
       }
})

User.prototype.validPassword = function(password) {
      return bcrypt.compareSync("password", this.password)
}

UserType.hasMany(User, { as: 'users', foreignKey:'user_type_id'});
User.belongsTo(UserType, { as: 'atiq', foreignKey: "user_type_id"});

module.exports = User;
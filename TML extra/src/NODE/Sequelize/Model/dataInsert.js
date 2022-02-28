const moment=require('moment')
module.exports = (Connection, DataTypes) => {
    const data = Connection.define('userData', {
        order_from_country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Username: {
            type: DataTypes.STRING,
            allownull: false
        },
        shipName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipAddr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipTell: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shipEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipPic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consAddr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consTell: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        consEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consPic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        competition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        port_of_loading: {
            type: DataTypes.STRING,
            allowNull: false
        },
        port_of_discharge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        final_destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comodities: {
            type: DataTypes.STRING,
            allowNull: false
        },
        freight_term: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remark: {
            type: DataTypes.STRING(6000),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,                  
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
            }
        }

    })
    return data
}
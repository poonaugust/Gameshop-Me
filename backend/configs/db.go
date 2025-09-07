package configs

import (
	"log"

	role "gameshop-backend/entity/role"
	ws "gameshop-backend/entity/workshop"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

// ConnectDB เชื่อมต่อ database และเก็บ instance ไว้
func ConnectDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("gameshop.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database:", err)
	}
}

// DB คืนค่า instance ของ gorm.DB
func DB() *gorm.DB {
	return db
}

// SetupDatabase ทำ AutoMigrate สำหรับทุก entity
func SetupDatabase() {
	err := db.AutoMigrate(
		&role.User{},
		&role.Role{},
		&ws.GameUser{},
		&ws.Game{},
		&ws.Mod{},
		&ws.Tags{},
		&ws.ModTags{},
		&ws.OwnerGame{},
		&ws.ModRating{},
	)
	if err != nil {
		log.Fatal("failed to migrate database:", err)
	}
}

package entity

import (
	"time"

	"gorm.io/gorm"
)

type OwnerGame struct {
	gorm.Model
	
	PurchaseDate  time.Time
	Status  string

	GameUserID *uint
	GameUser   GameUser `gorm:"foreignKey:GameUserID"`

	GameID *uint
	Game   Game `gorm:"foreignKey:GameID"`
	
}
package entity

import (
	"time"

	"gorm.io/gorm"
)

type ModRating struct {
	gorm.Model

	Rating  string
	Review string
	PurchaseDate  time.Time
	

	GameUserID *uint
	GameUser   GameUser `gorm:"foreignKey:GameUserID"`

	ModID *uint
	Mod   Mod `gorm:"foreignKey:ModID"`
	
}
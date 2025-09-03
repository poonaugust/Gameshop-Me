package entity

import (
	"time"

	"gorm.io/gorm"
)

type GameUser struct {
	gorm.Model
	Username  string
	Password  string
	Email     string
	FirstName string
	LastName  string
	Birthday  time.Time

	OwnerGame []OwnerGame `gorm:"foreignKey:GameUserID"`
	Mod []Mod `gorm:"foreignKey:GameUserID"`
	ModRating []ModRating `gorm:"foreignKey:GameUserID"`
	
}
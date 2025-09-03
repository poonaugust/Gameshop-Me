package entity

import "gorm.io/gorm"

type Game struct {
	gorm.Model
	Title string
	Description string

	
	OwnerGame []OwnerGame `gorm:"foreignKey:GameID"`
	Mod []Mod `gorm:"foreignKey:GameID"`
}
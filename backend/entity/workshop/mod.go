package entity

import (
	"time"

	"gorm.io/gorm"
)

type Mod struct {
	gorm.Model

	Title string
	Description string
	UploadDate  time.Time
	FilePath  string
	Status  string

	GameUserID *uint
	GameUser   GameUser `gorm:"foreignKey:GameUserID"`

	GameID *uint
	Game   Game `gorm:"foreignKey:GameID"`

	ModTags []ModTags `gorm:"foreignKey:ModID"`
	
}
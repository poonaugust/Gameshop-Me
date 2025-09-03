package entity

import "gorm.io/gorm"

type ModTags struct {
	gorm.Model

	ModID *uint
	Mod   Mod `gorm:"foreignKey:ModID"`

	TagsID *uint
	Tags   Tags `gorm:"foreignKey:TagsID"`
}
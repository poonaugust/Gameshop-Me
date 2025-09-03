package entity

import "gorm.io/gorm"

type Tags struct {
	gorm.Model
	Title string

	
	ModTags []ModTags `gorm:"foreignKey:TagsID"`
}
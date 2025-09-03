package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string
	Password  string
	Email     string
	FirstName string
	LastName  string
	Birthday  time.Time

	RoleID *uint
    Role   Role `gorm:"foreignKey:RoleID"`

	
}
package controllers

import (
	"net/http"

	"gameshop-backend/configs"
	"gameshop-backend/entity/workshop"
	"github.com/gin-gonic/gin"
)

// GET /games
func GetGames(c *gin.Context) {
	var games []entity.Game
	if err := configs.DB().Find(&games).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, games)
}

// GET /games/:id
func GetGameById(c *gin.Context) {
	id := c.Param("id")
	var game entity.Game
	if tx := configs.DB().Where("id = ?", id).First(&game); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "game not found"})
		return
	}
	c.JSON(http.StatusOK, game)
}

// POST /games
func CreateGame(c *gin.Context) {
	var game entity.Game
	if err := c.ShouldBindJSON(&game); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := configs.DB().Create(&game).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, game)
}

// PATCH /games/:id
func UpdateGame(c *gin.Context) {
	id := c.Param("id")
	var game entity.Game
	if tx := configs.DB().Where("id = ?", id).First(&game); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "game not found"})
		return
	}

	var input entity.Game
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := configs.DB().Model(&game).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, game)
}

// DELETE /games/:id
func DeleteGame(c *gin.Context) {
	id := c.Param("id")
	if tx := configs.DB().Exec("DELETE FROM games WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "game not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted successfully"})
}

CREATE TABLE cocktails (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,        
    prix DECIMAL(5, 2) NOT NULL,
    image VARCHAR(100) NOT NULL     
);

CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,           
    stock INT NOT NULL                  
);

CREATE TABLE cocktail_ingredients (
    cocktail_id INT,                      
    ingredient_id INT,                    
    quantite INT NOT NULL,                
    PRIMARY KEY (cocktail_id, ingredient_id),  
    FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

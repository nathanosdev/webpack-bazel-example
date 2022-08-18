use thirtyfour::prelude::*;

#[tokio::main]
async fn main() -> WebDriverResult<()> {
    let capabilities = DesiredCapabilities::chrome();
    let driver = WebDriver::new("http://localhost:9515", capabilities).await?;

    driver.goto("http://localhost:8080").await?;

    let heading = driver.find(By::Id("page-title")).await?;
    let heading_text = heading.text().await?;

    assert_eq!(heading_text, "Hello world!");

    driver.quit().await?;
    Ok(())
}

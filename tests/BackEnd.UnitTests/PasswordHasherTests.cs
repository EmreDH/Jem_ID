using BackEnd.Classes;
using FluentAssertions;

public class PasswordHasherTests
{
    [Fact]
    public void HashPassword_ShouldReturnDifferentValueThanInput()
    {
        var password = "MySecret123";

        var hash = PasswordHasher.HashPassword(password);

        hash.Should().NotBe(password);
        hash.Length.Should().BeGreaterThan(20);
    }

    [Fact]
    public void VerifyPassword_ShouldReturnTrueForCorrectPassword()
    {
        var password = "Test123!";
        var hash = PasswordHasher.HashPassword(password);

        var ok = PasswordHasher.VerifyPassword(password, hash);

        ok.Should().BeTrue();
    }

    [Fact]
    public void VerifyPassword_ShouldReturnFalseForWrongPassword()
    {
        var hash = PasswordHasher.HashPassword("CorrectPass");

        var ok = PasswordHasher.VerifyPassword("WrongPass", hash);

        ok.Should().BeFalse();
    }
}
